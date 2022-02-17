import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database";
import AWS from 'aws-sdk';

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
  getDoc, getDocs, getAll
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


/**
* Backend plugin DO NOT instantiate, just plug it in Vue
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

  }

  /**
  * Creates a new server application document in DB
  * {ServerApplication} serverApplication : data for the server application
  * @return {Promise<{uid, data}>} a promise with the uid of the document and the exact data sent
  */
  createServer(serverApplication) {

    let data = new ServerApplicationConverter.toFirestore(serverApplication)

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
      console.log(res)
      return setDoc( newServerRef, data )
    })
    .then(() => {
      console.log("Successful firestore registration")
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
    return this.addServerToEventApplication(serverId, "applied-svs-iv")
  }

  /**
  * Creates and add a server to the svs event application
  * It just chains createserver and adds4application.
  * @return promise to the document ref in firebase of the application
  */
  createServerApplicationToSvSIV(serverApplication) {
    return this.createServer(serverApplication)
      .then( res => {
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
    const serverStateKey = ["applied_svs_iv","accepted_svs_iv","denied_svs_iv"];
    this._getList(serverStateKey[state]).then(server_ids => {
      this._getServersById(server_ids).then(
         servers => {return servers;}
      )
    })


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
    const refs = server_id.map(id => doc(this._firestoreDb,`servers/${id}`))
    for(let si in server_id ){
        promises.push(getDoc(refs[si]).then(
          document => {
            data[si] = document.data();
            console.log(data);
            return document;
          }
        ))

  return Promise.all(promises).then(() => {
    console.log(data);return data;});      
  }
  
  
  
  
  }

  // ======== Anonymous concerns

  /**
  * Creates a new ticket
  * @returns a promise on the document created (id of the document is the ticket id)
  */
  createAnonymousConcernsTicket(message) {
    const anonyConDocRef
      = addDoc(
          collection(this._firestoreDb, "anonymous-concerns"),
          { message: message, date: new Date(), answer: "" }
        )

    return anonyConDocRef
  }

  /**
  * Gets all the tickets
  * @returns A promise on an array of AnonymousConcernsTicket
  */
  getAllAnonymousConcernsTickets() {
    const colSnap = getDocs(collection(this._firestoreDb, "anonymous-concerns"))

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
    return getDoc(doc(this._firestoreDb, "anonymous-concerns", id))
      .then(snappedDoc => {
        if (!snappedDoc.exists()) return null
        return AnonymousConcernsTicket.fromFirestoreDoc(snappedDoc)
      })
  }



  static install (Vue, options) {
    Vue.prototype.$svsBackend = new BackendPlugin(Vue)
  }

}
