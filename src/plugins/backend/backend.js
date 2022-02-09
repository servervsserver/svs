import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database";
import AWS from 'aws-sdk';

import {
  ServerApplication,
  ServerApplicationConverter
} from "../../models/dto/server-application"

import { collection, doc, setDoc, addDoc, getDocs } from "firebase/firestore";
// import { push, ref } from "firebase/database";

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
  */
  createServerApplication(serverApplication) {
    // TODO: Insert some final data validation

    let data = ServerApplicationConverter.toFirestore(serverApplication)

    const bucket = this._awsBucket
    const storeIconInAws = ref => {
      // console.log(ref, ref.id)
      const iconFile = serverApplication.icon
      const iconName = `${ref.id}.${data.iconExt}`
      // console.log(iconName)

      const params = {
        Bucket: bucket,
        Key: iconName,
        Body: iconFile,
        Prefix: "servers_icons/"
      };

      return {
        applicationDocRef: ref,
        iconRef: this._amazonS3.upload( params, (err, data) => {
          if (err) {
            console.error(err)
            throw err
          }
        })
      }
    }

    const serverApplicationDocRef
      = addDoc(
          collection(this._firestoreDb, "test-server-application"),
          data
        )
        .then(storeIconInAws)

    return serverApplicationDocRef
  }

  getAllServerApplications() {
    const colSnap = getDocs(collection(this._firestoreDb, "test-server-application"))
    // return colSnap
    // let apps = []
    // colSnap.forEach((doc) => {
    //   apps.
    // })
    return colSnap.then(snappedDocs => {
      let data = []
      snappedDocs.forEach(doc => {
        // console.log(doc.id, doc.data())
        data.push(ServerApplicationConverter.fromFirestore(doc.data()))
      })
      return data
    })
  }

  createAnonymousConcernsTicket(message) {
    const anonyConDocRef
      = addDoc(
          collection(this._firestoreDb, "test-anonymous-concerns"),
          { message: message, date: new Date(), answer: "" }
        )

    return anonyConDocRef
  }

  getAllAnonymousConcernsTickets() {
    const colSnap = getDocs(collection(this._firestoreDb, "test-anonymous-concerns"))

    return colSnap.then(snappedDocs => {
      let data = []
      snappedDocs.forEach(doc => {
        data.push({
          id: doc.id,
          message: doc.data().message,
          answer: doc.data().answer,
          date: new Date(doc.data().date.seconds * 1000)
        })
      })
      return data
    })
  }



  static install (Vue, options) {
    Vue.prototype.$svsBackend = new BackendPlugin(Vue)
  }

}
