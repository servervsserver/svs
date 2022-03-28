export class Track {

  constructor(id, title, trackUrl) {

    this.id       = id || null
    this.title    = title || ""
    this.trackUrl = trackUrl || ""
    this.credits  = []

  }

}
