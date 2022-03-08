// export class ArchiveSubmission {
//
//   constructor() {
//     this.eventId = "123456789"
//     this.eventName = "Default archive event"
//     this
//   }
//
// }

export class ArchiveTrack {

  constructor(id, title, trackUrl) {

    this.id       = id || null
    this.title    = title || ""
    this.trackUrl = trackUrl || ""
    this.credits  = []

  }

}

export class ArchiveEp {

  constructor(id, serverId, title, coverArtUri, epStreamLink) {

    this.id           = id || null
    this.serverId     = serverId || null
    this.title        = title || ""
    this.coverArtUri  = coverArtUri || ""
    this.epStreamLink = epStreamLink ||null
    this.trackIds     = []
  }

}

/* The numbers are arbitrary, may change based on the choices for the back */
export const ArchiveAccoladeType = Object.freeze({
  EP: 0,
  TRACK: 1,
  COVER_ART: 2
})

export class ArchiveAccoladeEntry {

  constructor() {
    this.id = "123456789"
  }

}

export class ArchiveAccolade {

  constructor() {

    this.id = "123456789"

  }

}
