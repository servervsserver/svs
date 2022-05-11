import { v4 as generateUuid } from "uuid"
/**
 * Represents a track in the audio player
 */
export class Track {

  /**
   * @param {string} id Id of the track
   * @param {string} name Name of the track
   * @param {string} source Source file of the track (an url)
   * @param {Album} album Album this track is part of
   * @param {Author} author Author of the track
   */
  constructor(id, title, source, album, author) {

    this._vueId = generateUuid()

    /**
     * @type {string} Unique identifier for the track
     */
    this.id       = id
    
    /**
     * @type {string} Title of the track
     */
    this.title     = title

    /**
     * @type {string} Audio source for the track
     */
    this.source   = source

    /**
     * @type {string} Artist of the track
     */
    this.author   = author
    
    /**
     * @type {Album} Album of the track
     */
    this.album    = album
  }

  get mediaMetadata() {

    let albumTitle  = ""
    let artwork     = ""

    if (this.album) {
      albumTitle  = this.album.title
      artwork     = this.album.coverArtUrl
    }

    let authorName = ""
    if (this.author) {
      authorName = this.author.name
    }
    
    console.log(this)

    let mm = new MediaMetadata({
      title: this.title,
      artist: authorName,
      album: albumTitle,
      artwork: [
        { src: artwork }
      ]
    })

    console.log(mm)
    return mm
  }
  /**
   * Only used by vue to have a unique id for the UI
   */
  get vueid() {
    return this._vueId
  }

}
