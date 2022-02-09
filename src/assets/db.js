import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database";
import AWS from 'aws-sdk';

// TODO: Replace with your app's Firebase project configuration
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

export const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const rtdb = getDatabase(app);
export const db = getFirestore(app);
export const s3 = new AWS.S3({
  accessKeyId: process.env.VUE_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VUE_APP_AWS_SECRET_ACCESS_KEY,
  region: 'eu-central-1'
})
