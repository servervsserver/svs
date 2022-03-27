import { initializeApp } from "firebase/app";
import { getFirestore, runTransaction, writeBatch } from "firebase/firestore"
import { getDatabase } from "firebase/database";

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
import { push, ref, child, get } from "firebase/database";

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
    console.log(typeof pathOrType !== 'string' && !!pathOrType.fromFirestore && pathOrType.fromFirestore === 'function')
    if (typeof pathOrType !== 'string' 
      && !!pathOrType.fromFirestore 
      && typeof pathOrType.fromFirestore === 'function') {
      data = pathOrType.fromFirestore(data)
    }
    return data
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
   * @param {File} file Path to the 
   * @param {string} folderPath 
   * @param {string} nameWithoutExtension 
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
    const filePath = `${this._useDevSubspace ? "dev_test/" : ""}${folderPath}/${nameWithoutExtension}${ext ? "." + ext : ""}`

    const params = {
      Bucket: this._awsBucket,
      Key: filePath,
      Body: file
    }

    return new Promise((resolve, reject) => {
      this._amazonS3.upload(
        params,
        (err, _) => {
          if (err) { 
            reject(err) 
          }
          else {
            resolve(`${this._cloudfrontEndpoint}/${filePath}`)
          }
        })
      })
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
        data.push(ServerApplicationConverter.fromFirestore(doc.data()))
      })
      return data;
    })
  }

  /**
  * Returns a list from Realtime Database given key
  * @return promise to the document ref in firebase of the application
  */
  getAppServers(state) {
    const serverStateKey = ["applied_svs_iv", "accepted_svs_iv", "denied_svs_iv"];
    return this._getList(serverStateKey[state]).then(server_ids => {
      return this._getServersById(server_ids).then(
        servers => { return servers; }
      )
    })


  }

  // E P
  /**
   * Creates an EP in the DB
   * @param {FirestoreModel.Ep} ep Track
   * @param {File} audioFile Audio file of the track
   */
  async createEp(ep, coverArtFile) {

    const serverRef = this.firestoreNewDocReference(FirestoreModel.Ep)
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
    return this.firestoreGetDocData(FirestoreModel.Ep, id)
  }
  
  /**
   * Deletes a track in the DB
   * @param {string} epId Id of the track to delete
   */
  async deleteEp(epId) {

    await this.firestoreDeleteDoc(FirestoreModel.Ep, epId)

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
          // console.log(data);
          return document;
        }
      ))

    }


    return Promise.all(promises).then(() => {
      // console.log(data);

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



  static install(Vue, options) {
    Vue.prototype.$svsBackend = new BackendPlugin(Vue)
  }

}
