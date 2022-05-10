/**
 * 
 */
export class Album {

  /**
   * 
   * @param {string} id Id of the album
   * @param {string} author Id of the author
   * @param {string} title Title of the album
   * @param {string} coverArtUrl Cover art of the album
   */
  constructor(id, author, title, coverArtUrl) {

    /**
     * @type {string|null} Id of the album
     */
    this.id               = id || null

    /**
     * @type {string|null} Id of the author
     */
    this.author           = author || null

    /**
     * @type {string} Title of the track
     */
    this.title            = title || ""

    /**
     * @type {string} Url of the cover art
     */
    this.coverArtUrl      = coverArtUrl || ""

    /**
     * @type {string[]} Id of the tracks of the album (in order)
     */
    this.trackIds         = []
    /**
     * @type {{[string]: any}} Additional datas
     */
    this.additionalDatas  = {}

  }

  /**
   * 
   * @param {string} key 
   * @param {any} value 
   * @returns {boolean}
   */
  setAdditionalData(key, value) {
    if (value === undefined) return false
    this.additionalDatas[key] = value
    return true
  }

}