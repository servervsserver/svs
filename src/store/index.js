import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nextSvsMainEventTime: new Date(2022, 1, 28, 2, 3, 4),
    _uid:undefined,
    profile:undefined
  },
  getters: {
    nextSvsMainEventRemainingTime: state => {
      return state.nextSvsMainEventTime.getTime() - Date.now()
    }
  },
  mutations: {
    set_uid(state,uid){
      state._uid = uid;
    },
    set_profile(state,data){
      console.log("set_data");
      state.profile = data;
    }
  },
  actions: {
  },
  modules: {
  }
})








//TODO: https://dev.to/nickitax/persistent-store-with-vuejs-vuex-and-vuex-persisted-state-354n