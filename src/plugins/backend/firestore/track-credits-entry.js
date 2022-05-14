import { Model } from "./core/model"

export class TrackCreditsEntry extends Model {

  constructor() {
    super()
    /**
     * @type {string} Id of the credit
     */
    this.id = null

    /**
     * @type {string} Id of the track this credits entry belongs to
     */
    this.track_id = null
    
    /**
     * @type {string} Artist name if applicable
     */
    this.artist_name = ""
    
    /**
    *  @type {string} Discord tag of the person
    */
    this.discord_tag = ""

    /**
    * @type {Array<string>} Roles the credited person had
    */
    this.roles = []

    /**
    * @type {boolean} If true, the person will be listed as anonymous publicly
    */
    this.anonymous = false
  }
}

/**
 * @type {string} Collection of this model
 */
TrackCreditsEntry.collection = "track_credits"
TrackCreditsEntry.fromFirestore = function(firestoreObject) {
  return new TrackCreditsEntry().fromFirestore(firestoreObject)
}


