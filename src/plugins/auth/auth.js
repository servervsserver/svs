import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";

import store from '@/store'
import AWS from 'aws-sdk';

import {
  ServerApplication,
  ServerApplicationConverter
} from "../../models/dto/server-application"

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


export default class AuthPlugin {

  constructor(Vue) {
    this._store = store;
    this.Vue = Vue
    this._firebaseApp = initializeApp(firebaseConfig);
    this._auth = getAuth();

  }


  getData(){
    console.log(this._store.state.user.loggedIn);
    return this._store.state.user.data
  } 

  isAuthenticated(){
    return this._store.state.user.loggedIn
  }

  isAdmin(){
    return this._store.state.user.data.isAdmin
  }

  isLeader(){
    return this._store.state.user.data.isLeader
  }


  logout(){
    signOut(this._auth).then(() => {
      
    this._store.dispatch("loginUser",null);
    this.$router.push({name:"Home"});
    }).catch((error) => {
      return error
    });
  }


  
  static install (Vue, options) {
    Vue.prototype.$svsAuth = new AuthPlugin(Vue)
  }

}
