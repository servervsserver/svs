export default class EpInfos {

  constructor() {

    this.name = null

    this.streamingLink = ""

    this.coverArtFile = null

    this.coverArtUrl = ""

  }

  get coverArtFilename() {
    if (!this.coverArtFile) return ""
    return this.coverArtFile.name
  }

}
