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

  get timeRemaining() {
    return this.date.getTime() - Date.now()
  }

  get timeFrom() {
    return - this.timeRemaining
  }

  get isPast() {
    return this.timeRemaining < 0
  }

  get isIncoming() {
    return this.timeRemaining > 0
  }
}

class SvSMainEventInformations {

  constructor() {

    this.serverApplicationPhaseStart = new EventMilestone(
      "Server applications open",
      new Date(Date.UTC(2022, 1, 19, 19, 0, 0)),
      "Applications open on our website for servers to take part in the Server vs Server IV competition!"
    )

    this.recapStream = new EventMilestone(
      "Server vs Server III recap",
      new Date(Date.UTC(2022, 1, 19, 19, 0, 0)),
      "We run our first big stream in a while, recapping the moments and music of SvS III with some highlights before formally announcing our timeline for SvS IV!"
    )

    this.serverApplicationPhaseEnd = new EventMilestone(
      "Server applications close",
      new Date(Date.UTC(2022, 2, 19, 23, 59, 0)),
      "Applications for servers to join the competition close (don’t miss it!). Reviewing and accepting applications concludes over the following week."
    )

    this.competitionStart = new EventMilestone(
      "Competition begins and kick off stream",
      new Date(Date.UTC(2022, 2, 26, 19, 0, 0)),
      "Join us on Twitch as we kick off the start of the month of music making with the selection of the competition’s theme by a live vote!"
    )

    this.midCompetitionStream1 = new EventMilestone(
      "End of Week #1 Check in stream",
      new Date(Date.UTC(2022, 3, 2, 21, 0, 0)),
      "Our first check-in stream where we’ll give advice and resources to participants on how they can make the most out of taking part; and of course, raise money for charity."
    )

    this.midCompetitionStream2 = new EventMilestone(
      "End of Week #2 Check in stream",
      new Date(Date.UTC(2022, 3, 9, 21, 0, 0)),
      "Our second check-in stream to keep you motivated, see how communities are doing and hopefully smash some donation goals. Details TBA"
    )

    this.midCompetitionStream3 = new EventMilestone(
      "End of Week #3 Check in stream",
      new Date(Date.UTC(2022, 3, 16, 21, 0, 0)),
      "Our final check-in stream to hopefully take some of the pressure of (or put it on…) before the submissions close the following week. Details TBA"
    )

    this.competitionEnd = new EventMilestone(
      "Competition submissions close",
      new Date(Date.UTC(2022, 3, 23, 23, 59, 0)),
      "The one and only final deadline for servers to submit their completed EPs through our website."
    )

    this.competitionEndStream = new EventMilestone(
      "Competition end stream",
      new Date(Date.UTC(2022, 3, 24, 21, 0, 0)),
      "Join us on Twitch to reflect on how the music-making period has gone, before we launch into our full-blown EP festival just a few days after."
    )

    this.epFestival1 = new EventMilestone(
      "EP Festival - Day 1",
      new Date(Date.UTC(2022, 3, 29, 21, 0, 0)),
      "The first day of our EP festival, where we’ll be playing and celebrating the music, art, and even visualizers/video that participating servers have produced; complete with live interviews with server leaders/representatives!"
    )

    this.epFestival2 = new EventMilestone(
      "EP Festival - Day 2",
      new Date(Date.UTC(2022, 3, 30, 21, 0, 0)),
      ""
    )

    this.epFestival3 = new EventMilestone(
      "EP Festival - Day 3",
      new Date(Date.UTC(2022, 3, 31, 19, 0, 0)),
      ""
    )

    this.epFestival4 = new EventMilestone(
      "EP Festival - Day 4",
      new Date(Date.UTC(2022, 4, 6, 21, 0, 0)),
      ""
    )

    this.epFestival5 = new EventMilestone(
      "EP Festival - Day 5",
      new Date(Date.UTC(2022, 4, 7, 21, 0, 0)),
      ""
    )

    this.epFestival6 = new EventMilestone(
      "EP Festival - Day 6",
      new Date(Date.UTC(2022, 4, 8, 19, 0, 0)),
      ""
    )

    this.awardsCeremony = new EventMilestone(
      "Awards Ceremony",
      new Date(Date.UTC(2022, 4, 14, 21, 0, 0)),
      "Our awards ceremony, with the winners of each category decided by you and your vote!"
    )

  }

  get milestones() {
    return [
      this.serverApplicationPhaseStart,
      this.recapStream,
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
    _uid: undefined,
    svsMainEventInformations: new SvSMainEventInformations(),
    user: {
      loggedIn: false,
      data: null
    },
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
    nextMilestone: state => {
      return state.svsMainEventInformations.nextMilestone
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
    set_uid(state, uid) {
      state._uid = uid;
    },
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
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
  },
  modules: {
  }
})








//TODO: https://dev.to/nickitax/persistent-store-with-vuejs-vuex-and-vuex-persisted-state-354n
