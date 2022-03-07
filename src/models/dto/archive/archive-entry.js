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

  constructor() {

    this.id       = "123456789"
    this.title    = "Default track name"
    this.order    = 0
    this.credits  = []

  }

}

export const ArchiveAccoladeType = Object.freeze({
  EP,
  TRACK,
  COVER_ART
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
