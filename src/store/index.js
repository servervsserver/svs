import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// TODO: move these somewhere else like in the model for instance

class EventMilestone {
  /**
  * Creates an event milestone
  * {string} name : The name of the milestone
  * {Date} date : the date at which the milestone is reached
  * {string} description : a small description of the milestone
  */
  constructor(name, date, description) {
    this.name = name
    this.date = date
    this.description = description || ""
  }

  get timeRemaining () {
    return this.date.getTime() - Date.now()
  }

  get timeFrom () {
    return - this.timeRemaining
  }

  get isPast () {
    return this.timeRemaining < 0
  }

  get isIncoming () {
    return this.timeRemaining > 0
  }
}

class SvSMainEventInformations {

  constructor() {

    this.serverApplicationPhaseStart = new EventMilestone(
      "Server application start",
      new Date(Date.UTC(2022, 1, 19, 0, 0, 0)),
      "If you want to participate in the competition, you apply now!"
    )

    this.serverApplicationPhaseEnd = new EventMilestone(
      "Server application end",
      new Date(Date.UTC(2022, 2, 19, 0, 0, 0)),
      "Application is closed and we finish reviewing the participants until next week."
    )

    this.competitionStart = new EventMilestone(
      "Competition kick off!",
      new Date(Date.UTC(2022, 2, 26, 0, 0, 0)),
      "The competition starts! You have a month to produce the masterpiece we know you will produce!"
    )

    this.competitionEnd = new EventMilestone(
      "Competition submissions closed",
      new Date(Date.UTC(2022, 3, 23, 0, 0, 0)),
      "The EP submissions are now closed."
    )

  }

  get milestones() {
    return [
      this.serverApplicationPhaseStart,
      this.serverApplicationPhaseEnd,
      this.competitionStart,
      this.competitionEnd
    ]
  }

  get nextMilestone() {
    for (let m of this.milestones) {
      if (m.isIncoming) return m
    }
    return null
  }

}

export default new Vuex.Store({
  state: {
    _uid:undefined,
    profile:undefined,
    svsMainEventInformations: new SvSMainEventInformations()
  },
  getters: {
    isAdmin: state => {
      console.log(process.env)
      return process.env.VUE_APP_IS_ADMIN
    },
    nextMilestone: state => {
      return state.svsMainEventInformations.nextMilestone
    },
    isComingSoonBypassed: state => {
      return process.env.VUE_APP_BYPASS_COMINGSOON
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
