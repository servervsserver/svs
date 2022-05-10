export class Album {

  /**
   * @param {string} id Id of the album
   * @param {string} title Title of the album
   * @param {string} coverArtUrl Cover art of the album
   */
  constructor(id, title, coverArtUrl) {
    
    /**
     * @type {string|null} Id of the album
     */
     this.id               = id || null
     
    /**
     * @type {string} Title of the track
     */
    this.title            = title || ""

    /**
     * @type {string} Url of the cover art
     */
    this.coverArtUrl      = coverArtUrl || ""
  }


}