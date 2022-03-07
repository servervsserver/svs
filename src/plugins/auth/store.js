import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { User } from "@/models/dto/user"

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null
    }
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
    }
  },
  mutations: {
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
