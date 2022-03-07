import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken, signOut, onAuthStateChanged } from "firebase/auth";
import store from './store'
import router from '@/router'
const axios = require("axios");

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

    onAuthStateChanged(this._auth , (user) => {

      /* If no user, dipatch a null user and exit */
      if (!user) {
        store.dispatch("loginUser", null);
        localStorage.removeItem("userdata");
        return;
      }

      /* if already logged in, do not proceed further */
      if (store.getters.isLoggedIn) {
        return;
      }

      const uid = user.uid;
      let stored_data = JSON.parse(localStorage.getItem("userdata"));
      if (stored_data) {

        store.dispatch("loginUser", stored_data);

      } else {

        fetch(`https://svs4-327921.ew.r.appspot.com/users/${uid}`)
          .then((response) => response.json())
          .then((data) => {
            localStorage.setItem("userdata", JSON.stringify(data));
            store.dispatch("loginUser", data);
          })
          .catch(console.error);

      }
    });

  }

//#region Private functions
  async _grabDiscordProfile(tokenType, accessToken) {
    console.log(tokenType, accessToken);
    return axios.get("https://discord.com/api/users/@me", {
      headers: {
        authorization: `${tokenType} ${accessToken}`,
      }
    })
  }

  async _fAuth(token) {
    try {
      const userCredential = await signInWithCustomToken(this._auth, token);
      const uid = userCredential.user.uid;
      return uid;
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    }
  }

  async _authenticate(uid) {
    return axios.get(`https://svs4-327921.ew.r.appspot.com/authenticate?${uid}`, {
      params: { uid: uid }
    })
  }

  async fetchData(uid) {
    try {
      const response = await fetch(`https://svs4-327921.ew.r.appspot.com/users/${uid}`);
      const data = await response.json();
      return data;
    } catch (message) {
      return console.error(message);
    }
  }

//#endregion Private functions

  login(tokenType, accessToken) {
    this._grabDiscordProfile(tokenType, accessToken)
      .then((response) => {
        const uid = response.data.id;
        return this._authenticate(uid);
      })
      .then((response) => {
        let token = response.data;
        return this._fAuth(token);
      })
      .then((uid) => this.fetchData(uid))
      .then(data => {
        store.dispatch("loginUser", data);
        console.log(data)
        router.push({ name: "Profile" });
      });

  }

  checkAuth() {
    let user = this._auth.currentUser;
    if (user) {
      console.log(user);
    } else {
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAH');
    }
  }

  get user() {
    return this._store.getters.user.data
  }

  getData() {
    let data = (this._store.state.user.data);
    if (data) {
      let obj = {};
      let keys = Object.keys(data);
      let vals = Object.values(data);
      for (let key in keys) {
        obj[keys[key]] = vals[key];
      }

      return obj;
    }
    return undefined;
  }

  get isAuthenticated() {
    return this._store.getters.isLoggedIn
  }

  get isAdmin() {
    return this._store.getters.isAdmin
  }

  isLeader() {
    return this._store.getters.isLeader
  }

  logout() {
    signOut(this._auth).then(() => {
      return true
    }).catch((error) => {
      return error
    });
  }



  static install(Vue, options) {
    Vue.prototype.$svsAuth = new AuthPlugin(Vue)
  }

}
