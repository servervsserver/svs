export class TrackCreditsEntry {

  /**
   * 
   * @param {string} id 
   * @param {string} artistName 
   * @param {string[]} roles
   */
  constructor(id, artistName, roles) {
    /**
     * @type {string} Id of the credit
     */
    this.id           = id || null
    
    /**
     * @type {string} Artist name if applicable
     */
    this.artistName   = artistName || ""

    /**
    * @type {Array<string>} Roles the credited person had
    */
    this.roles        = roles || []

  }

}