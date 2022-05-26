import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithCustomToken, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";

import store, { AuthState } from './store'
import router from '@/router'
const axios = require("axios");

import { User } from "@/models/dto/user"

import { firebaseConfig } from "./firebase.config"

import { resolvePath } from "./helpers"
import { DiscordUserProfile, DiscordFlags } from "./discord-user"

export default class AuthPlugin {

  constructor(Vue) {

    this._store = store;
    this.Vue = Vue
    this._firebaseApp = initializeApp(firebaseConfig);
    this._firebaseAuth = getAuth();
    this._authEndpoint = "https://svs4-327921.ew.r.appspot.com"

    this._store.commit('authState', AuthState.PROCESSING_AUTHENTICATION)

    onAuthStateChanged(this._firebaseAuth , (user) => {

      console.log(this._store.state.authState)
      /* If no user, dipatch a null user and exit */
      if (!user) {
        store.dispatch("loginUser", null);
        localStorage.removeItem("userdata");
        return;
      }

      /* if already logged in, do not proceed further */
      if (store.getters.isLoggedIn) {
        this._store.commit('authState', AuthState.RESOLVED_AUTHENTICATION)
        return;
      }

      const uid = user.uid;
      let stored_data = User.fromJsonString(localStorage.getItem("userdata"));
      if (stored_data) {

        store.dispatch("loginUser", stored_data);
        this._store.commit('authState', AuthState.RESOLVED_AUTHENTICATION)

      } else {

        // fetch(`https://svs4-327921.ew.r.appspot.com/users/${uid}`)
        this._svsGet(['users', uid])
          .then((data) => {
            let user = User.fromAuthServData(data)
            localStorage.setItem("userdata", user.stringify());
            store.dispatch("loginUser", user);
            this._store.commit('authState', AuthState.RESOLVED_AUTHENTICATION)
          })
          .catch(console.error);

      }
    });

  }

  async whenReady() {
    return new Promise((resolve, reject) => {
      this._store.commit(
        'pushToReadyQueue', 
        () => {
          resolve() 
        })

      if (this._store.getters.isAuthenticationResolved) {
        this._store.commit('execReadyQueue')
      }

    })
  }

  /**
   * Logs a user in
   * @param {string} tokenType 
   * @param {string} accessToken 
   */
  async login(tokenType, accessToken) {
    return this._grabDiscordProfile(tokenType, accessToken)
      .then((discord_user_profile) => {
        return this._authenticate(discord_user_profile.id);
      })
      .then(token => {
        return this._fAuth(token);
      })
      .then((uid) => this.asyncGetUserData(uid))
      .then(user => {
        localStorage.setItem("userdata", user.stringify());
        store.dispatch("loginUser", user);
      });

  }


//#region Private functions

  /**
   * Gets a resource from our server
   * @param {string|string[]} path Path to get rss from
   */
  async _svsGet(path) {
    let rsPath = resolvePath([this._authEndpoint, resolvePath(path)])
    return await fetch(rsPath)
      .then(response => response.json())
  }

  async _grabDiscordProfile(tokenType, accessToken) {
    let res = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        authorization: `${tokenType} ${accessToken}`,
      }
    })
    return DiscordUserProfile.fromDiscordApi(res.data)
  }

  async _fAuth(token) {
    try {
      const userCredential = await signInWithCustomToken(this._firebaseAuth, token);
      const uid = userCredential.user.uid;
      return uid;
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    }
  }

  /**
   * 
   * @param {string} uid Uid of the user (discord's id)
   * @returns {string} JWT Token
   */
  async _authenticate(uid) {
    let res = await axios.get(`https://svs4-327921.ew.r.appspot.com/authenticate?${uid}`, {
      params: { uid: uid }
    })
    return res.data
  }

  // async svsGetUserData()
  async asyncGetUserData(uid) {
    try {
      const response = await fetch(`https://svs4-327921.ew.r.appspot.com/users/${uid}`);
      const data = await response.json();
      let user = User.fromAuthServData(data)
      return user;
    } catch (message) {
      console.error(message);
      return null
    }
  }

//#endregion Private functions


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
    return this._store.getters.isAdmin || (process.env.VUE_APP_IS_ADMIN == 'true')
  }

  isLeader() {
    return this._store.getters.isLeader
  }

  logout() {
    signOut(this._firebaseAuth).then(() => {
      return true
    }).catch((error) => {
      return error
    });
  }



  static install(Vue, options) {
    Vue.prototype.$svsAuth = new AuthPlugin(Vue)
  }

}
