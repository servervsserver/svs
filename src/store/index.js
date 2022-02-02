import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nextSvsMainEventTime: new Date(2022, 1, 28, 2, 3, 4)
  },
  getters: {
    nextSvsMainEventRemainingTime: state => {
      return state.nextSvsMainEventTime.getTime() - Date.now()
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
