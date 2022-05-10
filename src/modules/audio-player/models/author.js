export class Author {

  /**
   * @param {string} id Id of the album
   * @param {string} name Title of the album
   */
  constructor(id, name) {
    
    /**
     * @type {string|null} Id of the album
     */
    this.id               = id || null
     
    /**
     * @type {string} Title of the track
     */
    this.name             = name || ""

  }


}