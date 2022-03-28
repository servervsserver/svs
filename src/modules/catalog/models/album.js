
export class Album {

  constructor(id, serverId, title, coverArtUri, epStreamLink) {

    this.id           = id || null
    this.serverId     = serverId || null
    this.title        = title || ""
    this.coverArtUri  = coverArtUri || ""
    this.epStreamLink = epStreamLink ||null
    this.trackIds     = []
  }

}