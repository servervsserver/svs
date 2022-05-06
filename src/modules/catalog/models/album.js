
export class Album {

  constructor(id, author, title, coverArtUrl) {

    this.id           = id || null
    this.author       = author || null
    this.title        = title || ""
    this.coverArtUrl  = coverArtUrl || ""
    this.additionalDatas  = {}
    this.trackIds         = []

  }

  setAdditionalData(key, value) {
    if (value === undefined) return false
    this.additionalDatas[key] = value
    return true
  }

}