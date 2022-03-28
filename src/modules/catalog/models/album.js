
export class Album {

  constructor(id, serverId, title, coverArtUrl, epStreamLink) {

    this.id           = id || null
    this.serverId     = serverId || null
    this.title        = title || ""
    this.coverArtUrl  = coverArtUrl || ""
    this.epStreamLink = epStreamLink ||null
    this.trackIds     = []
  }

}