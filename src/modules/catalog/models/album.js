
export class Album {

  constructor(id, author, title, coverArtUrl, epStreamLink) {

    this.id           = id || null
    this.author       = author || null
    this.title        = title || ""
    this.coverArtUrl  = coverArtUrl || ""
    this.epStreamLink = epStreamLink ||null
    this.trackIds     = []
  }

}