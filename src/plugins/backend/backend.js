import { initializeApp } from "firebase/app";
import { DocumentReference, getFirestore, runTransaction, writeBatch } from "firebase/firestore"
import { getDatabase, update } from "firebase/database";

import { getExtension } from "./utils"

import AWS from 'aws-sdk';

import * as FirestoreModel from "./firestore"

import {
  ServerApplication,
  ServerApplicationConverter
} from "../../models/dto/server-application"

import {
  AnonymousConcernsTicket
} from "../../models/dto/anonymous-concerns"

import {
  collection, doc,
  setDoc, addDoc,
  getDoc, getDocs, getAll,
  deleteDoc
} from "firebase/firestore";
import { push, ref, child, get, onValue, set } from "firebase/database";
import { AwardVoteEntry } from "./firestore";


function removeLeadingAndTrailingSlashes(str) {
  if (!str) return str
  return str.replace(/(^[\/\\]+)|(\/[\/\\]+$)/g, "")
}

function replaceBackwardForForwardSlashes(str) {
  if (!str) return str
  return str.replace(/\\/g, "/")
}

function resolvePath(path) {
  if (path instanceof Array) {
    let p = path.map(v => removeLeadingAndTrailingSlashes(replaceBackwardForForwardSlashes(v)))
    path = p.join('/')
  }
  return path
}

/*
* Firebase config
*/
const firebaseConfig = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  // The value of `databaseURL` depends on the location of the database
  databaseURL: process.env.VUE_APP_databaseURL,
  projectId: process.env.VUE_APP_projectId,
  storageBucket: process.env.VUE_APP_storageBucket,
  messagingSenderId: process.env.VUE_APP_messagingSenderId,
  appId: process.env.VUE_APP_appId,
  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  measurementId: process.env.VUE_APP_measurementId,
};

/**
* Amazon config
*/
const amazonS3Config = {
  accessKeyId: process.env.VUE_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VUE_APP_AWS_SECRET_ACCESS_KEY,
  region: 'eu-central-1'
};

function resolvePathOrType(pathOrType) {
  if (!pathOrType) {
    throw Error("pathorType Cannot be null or empty")
  }

  if (typeof pathOrType === 'string') {
    return pathOrType
  }

  if (pathOrType.collection === undefined || typeof pathOrType.collection !== 'string') {
    throw Error("The type must have a class member named collection with the path to the collection in the store")
  }

  return pathOrType.collection
}

/**
* Backend plugin DO NOT instantiate, just plug it in Vue.
* Firebase/Firestore collections use snake_case conventions
*/
export default class BackendPlugin {

  /**
  *
  */
  constructor(Vue) {

    this.Vue = Vue

    this._firebaseApp = initializeApp(firebaseConfig)
    this._firebaseDb = getDatabase(this._firebaseApp)
    this._firestoreDb = getFirestore(this._firebaseApp)

    this._amazonS3 = new AWS.S3(amazonS3Config)
    this._awsBucket = process.env.VUE_APP_AWS_BUCKET_NAME
    this._useDevSubspace = process.env.VUE_APP_AWS_USE_DEV_SUBSPACE == "true"
    this._cloudfrontEndpoint = process.env.VUE_APP_CLOUDFRONT_ENDPOINT

  }

  // ==========================================
  // Helpers
  // ==========================================

  /**
   * Get a new doc reference
   * @param {*} pathOrType 
   * @returns 
   */
  firestoreNewDocReference(pathOrType) {
    let path = resolvePathOrType(pathOrType)
    return doc(collection(this._firestoreDb, path))
  }

  /**
   * Gets a reference on a document
   * @param {*} pathOrType 
   * @param {string} docId 
   * @returns 
   */
  firestoreDoc(pathOrType, docId) {
    if (!docId) throw Error("docId cannot be null or empty")
    let path = resolvePathOrType(pathOrType)
    return doc(this._firestoreDb, path, docId)
  }

  /**
   * Gets a reference on a collection
   * @param {*} pathOrType 
   * @returns 
   */
  firestoreCollection(pathOrType) {
    let path = resolvePathOrType(pathOrType)
    return collection(this._firestoreDb, path)
  }

  /**
   * Gets a document. If possible, it will convert it to the true model object
   * @param {*} pathOrType 
   * @param {*} docId 
   * @returns 
   */
  async firestoreGetDocSnapshot(pathOrType, docId) {
    if (!docId) throw Error("docId cannot be null or empty")
    let doc = await getDoc(this.firestoreDoc(pathOrType, docId))
    return doc
  }

  async firestoreGetDocData(pathOrType, docId) {
    let snap = await this.firestoreGetDocSnapshot(pathOrType, docId)
    if (!snap.exists()) return null
    let data = snap.data()
    if (typeof pathOrType !== 'string'
      && !!pathOrType.fromFirestore
      && typeof pathOrType.fromFirestore === 'function') {
      data = pathOrType.fromFirestore(data)
      if (data.id === null) data.id = docId
    }
    return data
  }

  async firestoreGetCollectionSnapshot(pathOrType) {
    let snap = await getDocs(this.firestoreCollection(pathOrType))
    return snap
  }

  async firestoreGetCollectionData(pathOrType) {
    const snap = await this.firestoreGetCollectionSnapshot(pathOrType)
    let res = {}
    snap.forEach((doc) => {
      let data = doc.data()
      if (typeof pathOrType !== 'string'
        && !!pathOrType.fromFirestore
        && typeof pathOrType.fromFirestore === 'function') {
        data = pathOrType.fromFirestore(data)
      }
      res[doc.id] = data
    })
    return res
  }

  /**
   * Writes a document
   * @param {*} documentReference Document to write
   * @param {*} data Data to write. If it's not firestore friendly but as a toFirestore function it will make the conversion  
   * @returns {Promise<string>} A promise returning the id of the document
   */
  async firestoreWriteDoc(documentReference, data) {
    if (data.toFirestore && typeof data.toFirestore === 'function')
      data = data.toFirestore()
    await setDoc(documentReference, data)
    return documentReference.id
  }

  /**
   * Writes multiple documents in a single batch
   * @param {{ref: DocumentReference<any>, data: FirestoreModel.Model}[]} documents 
   */
  async firestoreWriteDocs(documents) {
    const batch = writeBatch(this._firestoreDb)

    for (let doc of documents) {
      let data = doc.data.toFirestore()
      batch.set(doc.ref, data)
    }

    return await batch.commit()
  }

  /**
   * Deletes a documents of a given id
   * @param {*} pathOrType FirestoreModel or path to the collection
   * @param {string} docId Id of the document
   * @returns {Promise<void>} A promise resolved upon deletion
   */
  async firestoreDeleteDoc(pathOrType, docId) {
    return deleteDoc(this.firestoreDoc(pathOrType, docId))
  }

  /**
   * 
   * @param {(transaction: Transaction) => Promise<any>} transactionFnc Transaction function
   * @returns 
   */
  async firestoreTransaction(transactionFnc) {
    throw Error("Not implemented")
    // return runTransaction(this._firebaseDb, transactionFnc)
  }

  /**
   * Uploads a file to aws
   * @param {File} file File to upload
   * @param {string} folderPath Path to the file within the server
   * @param {string} nameWithoutExtension Name of the file
   * @return {Promise<string>} The full path to access the file
   */
  async awsUploadFile(file, folderPath, nameWithoutExtension) {
    if (!file) {
      throw Error("File cannot be null")
    }
    if (!folderPath) {
      throw Error("You must provide a folder path")
    }
    if (!nameWithoutExtension) {
      throw Error("You must provide a name to the file")
    }
    folderPath = folderPath.replace(/\\/g, "/").replace(/(^\/+)|(\/+$)/g, "")
    if (/[^A-Za-z0-9-_\/]/.test(folderPath)) {
      throw Error("The folder path has invalid characters (must be alphanumerical, underscore, dash and forward slash")
    }
    nameWithoutExtension = nameWithoutExtension.replace(/\\/g, "/").replace(/(^\/+)|(\/+$)/g, "")
    if (/[^A-Za-z0-9-_]/.test(nameWithoutExtension)) {
      throw Error("The file name has invalid characters (must be alphanumerical, underscore or dash")
    }

    const ext = getExtension(file)
    const filePath0 = `${this._useDevSubspace ? "dev_test/" : ""}${folderPath}/${nameWithoutExtension}${ext ? "." + ext : ""}`
    const filePath = filePath0.replace("undefined/", "");
    const params = {
      Bucket: this._awsBucket,
      Key: filePath,
      Body: file
    }

    const endpoint = this._cloudfrontEndpoint;
    return new Promise((resolve, reject) => {
      this._amazonS3.upload(
        params,
        (err, _) => {
          if (err) {
            reject(err)
          }
          else {
            resolve(`${endpoint}/${filePath}`)
          }
        })
    })
  }

  /**
   * 
   * @param {{file: File, path: string, name: string}[]} filesToUpload 
   * @returns 
   */
  async awsUploadFiles(filesToUpload) {
    let promises = filesToUpload.map(ftu => this.awsUploadFile(ftu.file, ftu.path, ftu.name))
    return Promise.all(promises)
  }

  async getFirebaseDoc(path) {
    path = resolvePath(path)
    const dbRef = ref(
      this._firebaseDb,
      path
    )
    return new Promise((resolve, reject) => {
      onValue(dbRef, (snapshot) => {
        if (!snapshot.exists()) {
          reject("The item doesn't exist")
          return
        }
        const data = snapshot.val()
        resolve(data)
        return
      })
    })
  }

  async writeFirebaseData(path, data) {
    if (!path) {
      throw Error("Path cannot be null")
    }
    if (path instanceof Array) {
      let p = path.map(v => removeLeadingAndTrailingSlashes(replaceBackwardForForwardSlashes(v)))
      path = p.join('/')
    }
    const dbRef = ref(this._firebaseDb, path)
    await set(dbRef, data)
  }

  async updatesFirebase(updates) {
    return await update(ref(this._firebaseDb), updates)
  }
  /**
  * Creates a new server application document in DB
  * {ServerApplication} serverApplication : data for the server application
  * @return {Promise<{uid, data}>} a promise with the uid of the document and the exact data sent
  */
  createServer(serverApplication) {

    let data = ServerApplicationConverter.toFirestore(serverApplication)

    const newServerRef = doc(collection(this._firestoreDb, "servers"))
    let uid = newServerRef.id
    let iconName = `servers_icons/${uid}.${data.iconExt}`

    const params = {
      Bucket: this._awsBucket,
      Key: iconName,
      Body: serverApplication.icon
    }

    data.icon_url = `d16ax4eys2wwsd.cloudfront.net/${iconName}`

    return new Promise((resolve, reject) => {

      this._amazonS3.upload(
        params,
        (err, res) => {

          if (err) {
            console.error(err)
            reject(err)
          } else {

            resolve("Successful upload on S3")
          }

        })

    }).then(res => {
      return setDoc(newServerRef, data)
    })
      .then(() => {
        return { uid, data }
      })

  }

  /**
  * Adds a server to an event application
  * @return promise to the document ref in firebase of the application
  */
  addServerToEventApplication(serverId, eventName) {
    const appRef = ref(this._firebaseDb, eventName)
    return push(appRef, serverId)
  }

  /**
  * Returns a list from Realtime Database given key
  * @return promise to the document ref in firebase of the application
  */
  _getList(key) {
    const appRef = ref(this._firebaseDb, key)
    return get(appRef).then(snapshot => {
      if (snapshot.exists()) {
        return (snapshot.val());
      } else {
        return ("No data available");
      }
    }).catch((error) => {
      return (error);
    });
  }

  /**
  * Adds a server to the svs 4 event applications
  */
  addServerToSvSIVApplications(serverId) {
    return this.addServerToEventApplication(serverId, "applied_svs_iv")
  }

  /**
  * Creates and add a server to the svs event application
  * It just chains createserver and adds4application.
  * @return promise to the document ref in firebase of the application
  */
  createServerApplicationToSvSIV(serverApplication) {
    return this.createServer(serverApplication)
      .then(res => {
        return this.addServerToSvSIVApplications(res.uid)
      })
  }

  /**
  * Gets all the servers
  * @returns An array of all the ServerApplication
  * TODO: it actually disreguards the list in firebase of the submissions for this Event.
  * This has no impact now, but once we get some new events, going on it needs to be changed
  *
  */
  getAllServers() {
    const colSnap = getDocs(collection(this._firestoreDb, "servers"))
    return colSnap.then(snappedDocs => {
      let data = []
      snappedDocs.forEach(doc => {
        let d = doc.data()
        d.id = doc.id
        data.push(ServerApplicationConverter.fromFirestore(d))
      })
      return data;
    })
  }

  // /**
  //  * Get all the eps in a dictionary index by id
  //  * @returns {Object}
  //  */
  //   async getAllServers() {
  //     return this.firestoreGetCollectionData(FirestoreModel.Album)
  //   }


  /**
  * Returns a list from Realtime Database given key
  * @return promise to the document ref in firebase of the application
  */
  getAppServers(state) {
    const serverStateKey = ["applied_svs_iv", "accepted_svs_iv", "denied_svs_iv"];
    return this._getList(serverStateKey[state])
      .then(server_ids => {
        return this._getServersById(server_ids)
          .then(
            servers => { return servers; }
          )
      })


  }

  // SvS IV submission

  /**
   * @param {string} serverId Id of the server submitting
   * @param {FirestoreModel.Album} album 
   * @param {FirestoreModel.Track[]} tracks 
   * @param {FirestoreModel.TrackCreditsEntry[][]} credits 
   * @param {File} coverArtFile 
   * @param {File[]} trackAudioFiles 
   */
  async submitFullAlbum(serverId, album, tracks, credits, coverArtFile, trackAudioFiles) {

    if (tracks.length != trackAudioFiles.length) {
      throw Error("The number of tracks must be the same as audio files")
    }

    // Prepare what to write to firestore and AWS
    const docsToWrite = []
    let filesToUpload = []

    const albumServerRef = this.firestoreNewDocReference(FirestoreModel.Album)
    let albumUid = albumServerRef.id

    album.server_id = serverId
    album.id = albumUid

    for (let trackIdx in tracks) {
      let track = tracks[trackIdx]
      const trackServerRef = this.firestoreNewDocReference(FirestoreModel.Track)
      let trackUid = trackServerRef.id

      track.id = trackUid
      track.album_id = album.id

      album.tracks_ids.push(trackUid)


      let trackCredits = credits[trackIdx]

      for (let creditsEntryIdx in trackCredits) {
        let creditEntry = trackCredits[creditsEntryIdx]
        const ceServerRef = this.firestoreNewDocReference(FirestoreModel.TrackCreditsEntry)
        let ceUid = ceServerRef.id

        creditEntry.id = ceUid
        creditEntry.track_id = track.id

        track.credits_ids.push(ceUid)

        docsToWrite.push({ ref: ceServerRef, data: creditEntry })
      }

      filesToUpload.push({ file: trackAudioFiles[trackIdx], path: 'tracks/audio_files', name: trackIdx + "-" + trackUid })
      docsToWrite.push({ ref: trackServerRef, data: track })
    }

    filesToUpload.push({ file: coverArtFile, path: 'albums/cover_arts', name: albumUid })
    docsToWrite.push({ ref: albumServerRef, data: album })

    // Upload to aws
    let awsRes = await this.awsUploadFiles(filesToUpload)

    // Add the file urls to firestore data
    let coverArtUrl = awsRes[awsRes.length - 1]
    album.coverart_url = coverArtUrl

    for (let trackIdx in tracks) {
      let track = tracks[trackIdx]
      let audioUrl = awsRes[trackIdx]
      track.audiofile_url = audioUrl
    }

    // Write firestore data

    await this.firestoreWriteDocs(docsToWrite)

    try {
      let eventId = 'svs_iv'
      await this.writeAlbumInServerCatalog(album.id, eventId, serverId)
      await this.writeAlbumInEventCatalog(album.id, eventId, serverId)
    } catch (error) {
      console.error("Failed to write in the catalog")
    }
    // for( let docToWrite of docsToWrite) {
    //   this.firestoreWriteDoc(docToWrite.ref, docToWrite.data)
    // }

  }

  // E P
  /**
   * Creates an EP in the DB
   * @param {FirestoreModel.Ep} ep Track
   * @param {File} audioFile Audio file of the track
   */
  async createEp(ep, coverArtFile) {

    const serverRef = this.firestoreNewDocReference(FirestoreModel.Album)
    let uid = serverRef.id

    ep.id = uid
    ep.coverart_url = await this.awsUploadFile(coverArtFile, 'albums/cover_arts', uid)

    const res = await this.firestoreWriteDoc(serverRef, ep);

    return res
  }

  /**
   * Get an EP by its id
   * @param {*} id 
   * @returns The FirestoreModel.EP if it exists, null otherwise.
   */
  async getEpById(id) {
    return this.firestoreGetDocData(FirestoreModel.Album, id)
  }

  /**
   * Get an Album by its id
   * @param {*} id 
   * @returns The FirestoreModel.Album if it exists, null otherwise.
   */
  async getAlbumById(id) {
    return this.firestoreGetDocData(FirestoreModel.Album, id)
  }

  /**
   * Get all the eps in a dictionary index by id
   * @returns {Object}
   */
  async getAllEps() {
    return this.firestoreGetCollectionData(FirestoreModel.Album)
  }

  /**
   * Deletes a track in the DB
   * @param {string} epId Id of the track to delete
   */
  async deleteEp(epId) {

    await this.firestoreDeleteDoc(FirestoreModel.Album, epId)

  }

  // T R A C K
  /**
   * Creates a track in the DB
   * @param {FirestoreModel.Track} track Track
   * @param {File} audioFile Audio file of the track
   */
  async createTrack(track, audioFile) {

    const serverRef = this.firestoreNewDocReference(FirestoreModel.Track)
    let uid = serverRef.id

    track.id = uid
    track.audiofile_url = await this.awsUploadFile(audioFile, 'tracks/audio_files', uid)

    const res = await this.firestoreWriteDoc(serverRef, track);

    return res
  }

  /**
   * Get a track by its id
   * @param {*} id 
   * @returns The FirestoreModel.Track if it exists, null otherwise.
   */
  async getTrackById(id) {
    return this.firestoreGetDocData(FirestoreModel.Track, id)
  }

  /**
   * Get all the tracks in a dictionary index by id
   * @returns {Object}
   */
  async getAllTracks() {
    return this.firestoreGetCollectionData(FirestoreModel.Track)
  }

  /**
   * Deletes a track in the DB
   * @param {string} trackId Id of the track to delete
   */
  async deleteTrack(trackId) {

    await this.firestoreDeleteDoc(FirestoreModel.Track, trackId)

  }

  // C R E D I T S
  /**
   * Creates a credit entry in the DB
   * @param {FirestoreModel.TrackCreditsEntry} creditsEntry Credit entry to create
   * @returns A promise on the credits entry id
   */
  async createCreditsEntry(creditsEntry) {

    const serverRef = this.firestoreNewDocReference(FirestoreModel.TrackCreditsEntry)
    let uid = serverRef.id
    creditsEntry.id = uid

    const res = await this.firestoreWriteDoc(serverRef, creditsEntry);

    return res
  }

  /**
   * Get a track credits entry by its id
   * @param {*} id 
   * @returns The FirestoreModel.Track if it exists, null otherwise.
   */
  async getTrackCreditsEntryById(id) {
    return this.firestoreGetDocData(FirestoreModel.TrackCreditsEntry, id)
  }

  /**
   * Deletes a crefdit entry from the DB
   * @param {TrackCreditsEntry} creditsEntryId Id of the credits entry to delete
   */
  async deleteCreditsEntry(creditsEntryId) {

    await this.firestoreDeleteDoc(FirestoreModel.TrackCreditsEntry, creditsEntryId)

  }

  async getAlbumCollectionById(id) {
    return await this.firestoreGetDocData(FirestoreModel.AlbumCollection, id)
  }


  // ===========================
  // ==== AWARDS ===============
  // ===========================

  /**
   * 
   * @param {FirestoreModel.AwardVote} awardVote 
   */
  async createAwardVote(awardVote) {

    const ref = this.firestoreNewDocReference(FirestoreModel.AwardVote)
    let uid = ref.id
    awardVote.id = uid

    const res = await this.firestoreWriteDoc(ref, awardVote);

    return res
  }

  async getAwardVoteById(id) {
    return await this.firestoreGetDocData(FirestoreModel.AwardVote, id)
  }

  async getAllAwardVotes() {
    return this.firestoreGetCollectionData(FirestoreModel.AwardVote)
  }

  /**
   * 
   * @param {FirestoreModel.AwardVoteEntry} awardVoteEntry 
   * @returns 
   */
  async createAwardVoteEntry(awardVoteEntry) {

    console.error("Not implemented!", awardVoteEntry)
    //return awardVoteEntry

    const ref = this.firestoreNewDocReference(FirestoreModel.AwardVoteEntry)
    let uid = ref.id
    awardVoteEntry.id = uid

    const res = await this.firestoreWriteDoc(ref, awardVoteEntry);

    return res
  }

  /**
   * 
   * @param {*} id 
   * @returns {Promise<FirestoreModel.Server>}
   */
  async getServerById(id) {
    return await this.firestoreGetDocData(FirestoreModel.Server, id)
  }

  async getServerIdOfLeader(leaderDiscordTag) {
    leaderDiscordTag = leaderDiscordTag.replace(/[\$\#\.\/\[\] ]/g, "_").toLowerCase()
    return await this.getFirebaseDoc(['leaders', leaderDiscordTag, 'server'].join("/"))
  }

  async getServerOfLeader(leaderDiscordTag) {
    let serverId = await this.getServerIdOfLeader(leaderDiscordTag)
    let server = await this.getServerById(serverId)
    return server
  }

  async writeAlbumInServerCatalog(album_id, event_id, server_id) {
    await this.writeFirebaseData(
      ['servers_catalogs', server_id, album_id],
      event_id
    )
  }

  async writeAlbumInEventCatalog(album_id, event_id, server_id) {
    await this.writeFirebaseData(
      ['events_catalogs', event_id, album_id],
      server_id
    )
  }

  async getAlbumsIdsOfEvent(event_id) {
    if (!event_id) event_id = 'svs_iv'

    try {
      let ids = await this.getFirebaseDoc(['events_catalogs', event_id])
      return ids
    } catch (error) {
      console.error(error)
      return null
    }
  }

  /**
   * 
   * @param {string} event_id 
   * @returns { albums, servers }
   */
  async getAlbumsAndServersOfEvent(event_id) {
    let ids = await this.getAlbumsIdsOfEvent(event_id)

    if (!ids) return null

    let albums = {}
    let servers = {}
    for (let id in ids) {
      let serverId = ids[id]
      let album = await this.getEpById(id)
      let server = await this.getServerById(serverId)

      albums[id] = album
      servers[serverId] = server
    }

    return { albums, servers }
  }

  async getAlbumsIdOfServer(server_id) {
    try {
      let ids = await this.getFirebaseDoc(['servers_catalogs', server_id])
      return ids
    } catch (error) {
    }
    return null
  }

  /**
   * 
   * @param {*} server_id 
   * @param {*} event 
   * @returns {Array<FirestoreModel.Album>}
   */
  async getAlbumsOfServer(server_id, event) {
    let ids = await this.getAlbumsIdOfServer(server_id)

    if (!ids) return null

    let albums = []
    for (let id in ids) {

      if (event && ids[id] !== event) continue
      let album = await this.getEpById(id)
      albums.push(album)
    }
    return albums
  }

  async writeAdminServMap() {
    let data = await this.getAllServers()

    const updates = {}
    data.forEach(sapp => {
      sapp.admins.forEach(a => {
        a = a.replace(/[\$\#\.\/\[\] ]/g, '_').toLowerCase()
        updates[['leaders', a].join('/')] = { server: sapp.id }
      })
    })

    await this.updatesFirebase(updates)
    return updates
  }


  /**
    * Gets all the servers
    * @returns An array of all the ServerApplication
    * TODO: it actually disreguards the list in firebase of the submissions for this Event.
    * This has no impact now, but once we get some new events, going on it needs to be changed
    *
    */
  _getServersById(servers) {
    let server_id = (Object.values(servers));
    let promises = [];
    let data = {};
    const refs = server_id.map(id => doc(this._firestoreDb, `servers/${id}`));

    for (let si in server_id) {
      promises.push(getDoc(refs[si]).then(
        document => {
          data[si] = document.data();
          return document;
        }
      ))

    }


    return Promise.all(promises).then(() => {
      return data;
    });


  }

  // ======== Anonymous concerns

  /**
  * Creates a new ticket
  * @returns a promise on the document created (id of the document is the ticket id)
  */
  createAnonymousConcernsTicket(message) {
    const anonyConDocRef
      = addDoc(
        collection(this._firestoreDb, "anonymous_concerns"),
        { message: message, date: new Date(), answer: "" }
      )

    return anonyConDocRef
  }

  getThemeSuggestions() {
    const appRef = ref(this._firebaseDb, "theme_suggestions")

    return get(appRef)

  }


  submitThemeSuggestion(message) {

    const appRef = ref(this._firebaseDb, "theme_suggestions")

    const suggestion
      = push(appRef, message);

    push()

    return suggestion

  }





  /**
  * Gets all the tickets
  * @returns A promise on an array of AnonymousConcernsTicket
  */
  getAllAnonymousConcernsTickets() {
    const colSnap = getDocs(collection(this._firestoreDb, "anonymous_concerns"))

    return colSnap.then(snappedDocs => {
      let data = []
      snappedDocs.forEach(doc => {
        data.push(AnonymousConcernsTicket.fromFirestoreDoc(doc))
      })
      return data
    })
  }

  /**
  * Gets a ticket by its id
  * @returns A promise on the AnonymousConcernsTicket of the corresponding id. null if not found
  */
  getAnonymousConcernsTicketById(id) {
    return getDoc(doc(this._firestoreDb, "anonymous_concerns", id))
      .then(snappedDoc => {
        if (!snappedDoc.exists()) return null
        return AnonymousConcernsTicket.fromFirestoreDoc(snappedDoc)
      })
  }





  /**Story's stuff */

  async getAllAlbumsUrls() {
    let data = [];

    let ids = await this.getAlbumsIdsOfEvent("svs_iv");
    for (let id in ids) {
      let serverId = ids[id]
      let obj = {};
      let arr = [];
      let album = await this.getEpById(id)
      let server = await this.getServerById(serverId)
      obj.name = server.name;
      obj.visual = album.visualizer_link;
      for (let t in album.tracks_ids) {
        let ti = album.tracks_ids[t];
        let tt = await this.getTrackById(ti);
        arr.push(tt.audiofile_url);
      }
      obj.tracks = arr;
      data.push(obj);
    }
    return data;
  }








  static install(Vue, options) {
    Vue.prototype.$svsBackend = new BackendPlugin(Vue)
  }

}
