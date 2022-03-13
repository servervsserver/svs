export default class EpInfos {

  constructor() {

    this.name = ""

    this.streamingLink = ""

    this._coverArtFile = null

    this._coverArtUrl = ""

  }

  get coverArtFilename() {
    if (!this.coverArtFile) return ""
    return this.coverArtFile.name
  }

  get coverArtFile() {
    return this._coverArtFile
  }

  set covertArtFile(file) {
    if (!file) this._coverArtUrl = null
    this._coverArtUrl = URL.createObjectURL(file)
  }

  get coverArtUrl() {
    return this._coverArtUrl
  }

  set coverArtUrl(url) {
    this._coverArtUrl = url
  }

}
