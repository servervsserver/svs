import Vue from 'vue'
import Vuex from 'vuex'

import { SvSIVInformations } from "@/models/event/svs-iv-informations"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    svsMainEventInformations: new SvSIVInformations(),
  },
  getters: {
    nextMilestone: state => {
      return state.svsMainEventInformations.nextMilestone
    },
    timeTillEpSubmission: state => {
      return state.svsMainEventInformations.midCompetitionStream3.timeRemaining + 60 * 60 * 1000 * 24 * 3
    },
    isComingSoonBypassed: state => {
      return process.env.VUE_APP_BYPASS_COMINGSOON == 'true'
    },
    isNotOpenYetBypassed: state => {
      return process.env.VUE_APP_BYPASS_NOTOPENYET == 'true'
    },
    isPreOpening: (state, getters) => {
      return state.svsMainEventInformations.serverApplicationPhaseStart.isIncoming && !getters.isNotOpenYetBypassed
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})








//TODO: https://dev.to/nickitax/persistent-store-with-vuejs-vuex-and-vuex-persisted-state-354n
