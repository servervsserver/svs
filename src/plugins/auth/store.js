import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { User } from "@/models/dto/user"

export const AuthState = Object.freeze({
  PRISTINE: 0,
  PROCESSING_AUTHENTICATION: 1,
  RESOLVED_AUTHENTICATION: 2
})

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
    authState: AuthState.PRISTINE,
    readyQueue: []
  },
  getters: {
    user: state => {
      return state.user
    },
    isLoggedIn: state => {
      return state.user.loggedIn
    },
    isAdmin: state => {
      return state.user.data ? state.user.data.isStaff : false;
    },
    isLeader: state => {
      return state.user.data ? state.user.data.isLeader : false;
    },
    isPristine: state => {
      return state.authState === AuthState.PRISTINE
    },
    isProcessingAuthentication: state => {
      return state.authState === AuthState.PROCESSING_AUTHENTICATION
    },
    isAuthenticationResolved: state => {
      return state.authState === AuthState.RESOLVED_AUTHENTICATION
    }
  },
  mutations: {
    authState: (state, newState) => {
      state.authState = newState
      switch(newState) {
        case AuthState.RESOLVED_AUTHENTICATION: 
          while(state.readyQueue.length) {
            state.readyQueue.shift()()
          }
          break;
      }
    },
    pushToReadyQueue: (state, fnc) => {
      state.readyQueue.push(fnc)
    },
    execReadyQueue: (state) => {
      while(state.readyQueue.length) {
        state.readyQueue.shift()()
      }
    },
    set_uid(state, uid) {
      state._uid = uid;
    },
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      if (!data) {
        state.user.data = null
        return
      }

      if (!(data instanceof User)) {
        data = User.fromPlainObject(data)
      }
      state.user.data = data;
    }
  },
  actions: {
    loginUser({ commit }, data) {
      commit("SET_LOGGED_IN", data !== null);
      if (data) {
        commit("SET_USER", data);
      } else {
        commit("SET_USER", null);
      }
    },
  }
})
