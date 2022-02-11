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
      "Server applications open",
      new Date(Date.UTC(2022, 1, 19, 0, 0, 0)),
      "If you want to participate in the competition, you apply now!"
    )

    this.serverApplicationPhaseEnd = new EventMilestone(
      "Server applications close",
      new Date(Date.UTC(2022, 2, 19, 23, 59, 0)),
      "Application is closed and we finish reviewing the participants until next week."
    )

    this.competitionStart = new EventMilestone(
      "Competition begins and kick off stream",
      new Date(Date.UTC(2022, 2, 26, 19, 0, 0)),
      "The competition starts! You have a month to produce the masterpiece we know you will produce!"
    )

    this.midCompetitionStream1 = new EventMilestone(
      "End of Week #1 Catch Up Stream",
      new Date(Date.UTC(2022, 3, 2, 21, 0, 0)),
      "First mid competition stream."
    )

    this.midCompetitionStream2 = new EventMilestone(
      "End of Week #2 Catch Up Stream",
      new Date(Date.UTC(2022, 3, 9, 21, 0, 0)),
      "Second mid competition stream."
    )

    this.midCompetitionStream3 = new EventMilestone(
      "End of Week #3 Catch Up Stream",
      new Date(Date.UTC(2022, 3, 15, 21, 0, 0)),
      "Third mid competition stream."
    )

    this.competitionEnd = new EventMilestone(
      "Competition submissions close",
      new Date(Date.UTC(2022, 3, 23, 23, 59, 0)),
      "The EP submissions are now closed."
    )

    this.competitionEndStream = new EventMilestone(
      "Competition end stream",
      new Date(Date.UTC(2022, 3, 24, 21, 0, 0)),
      "First mid competition stream."
    )

    this.epFestival1 = new EventMilestone(
      "EP Festival - Day 1",
      new Date(Date.UTC(2022, 3, 29, 21, 0, 0)),
      "First day of the EP festival."
    )

    this.epFestival2 = new EventMilestone(
      "EP Festival - Day 2",
      new Date(Date.UTC(2022, 3, 30, 21, 0, 0)),
      "Second day of the EP festival."
    )

    this.epFestival3 = new EventMilestone(
      "EP Festival - Day 3",
      new Date(Date.UTC(2022, 3, 31, 19, 0, 0)),
      "Third day of the EP festival."
    )

    this.epFestival4 = new EventMilestone(
      "EP Festival - Day 4",
      new Date(Date.UTC(2022, 4, 6, 21, 0, 0)),
      "Fourth day of the EP festival."
    )

    this.epFestival5 = new EventMilestone(
      "EP Festival - Day 5",
      new Date(Date.UTC(2022, 4, 7, 21, 0, 0)),
      "Fifth day of the EP festival."
    )

    this.epFestival6 = new EventMilestone(
      "EP Festival - Day 6",
      new Date(Date.UTC(2022, 4, 8, 19, 0, 0)),
      "Sixth day of the EP festival."
    )

    this.awardsCeremony = new EventMilestone(
      "Awards Ceremony",
      new Date(Date.UTC(2022, 4, 14, 21, 0, 0)),
      "The Server vs Server Awards Ceremony."
    )

  }

  get milestones() {
    return [
      this.serverApplicationPhaseStart,
      this.serverApplicationPhaseEnd,
      this.competitionStart,
      this.midCompetitionStream1,
      this.midCompetitionStream2,
      this.midCompetitionStream3,
      this.competitionEnd,
      this.competitionEndStream,
      this.epFestival1,
      this.epFestival2,
      this.epFestival3,
      this.epFestival4,
      this.epFestival5,
      this.epFestival6,
      this.awardsCeremony
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
