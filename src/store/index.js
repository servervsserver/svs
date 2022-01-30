import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nextSvsMainEventTime: new Date(2022, 2, 28, 0, 0, 0)
  },
  getters: {
    nextSvsMainEventRemainingTime: state => {
      console.log('Hello')
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
