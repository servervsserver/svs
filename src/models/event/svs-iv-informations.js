import { EventMilestone } from "./event-milestone"

export class SvSIVInformations {

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
      new Date(Date.UTC(2022, 2, 26, 18, 0, 0)),
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
