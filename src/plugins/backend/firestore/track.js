import { fromFirestore, toFirestore } from "./utils"

export class Track {

  constructor () {

    /**
     * @type {string} Id of the track
     */
    this.id = null

    /**
    * @type {string} name of the track
    */
    this.name = ''

    /**
     * @type {string} url to the track file
     */
    this.audiofile_url = ""

    /**
    * @type {string} lyrics of the track
    */
    this.lyrics = ''

    /**
    * @type {string} the music contains profanity and must be labeled Parental Advisory
    */
    this.explicit = false

    /**
    * @type {string} the genre(s) of the track by order of inmportance
    */
    this.genres = []

    /**
    * @type {Array<string>} Collection of credits ids
    */
    this.credits_ids = []
  }

}

/**
 * @type {string} Collection of this model
 */
Track.collection = "tracks"
Track.prototype.toFirestore = function() {
  return toFirestore(this)
}
Track.prototype.fromFirestore = function(firestoreObject) {
  return fromFirestore(this, firestoreObject)
}
Track.fromFirestore = function(firestoreObject) {
  return new Track().fromFirestore(firestoreObject)
}


export class TrackCreditsEntry {

  constructor() {

    /**
     * @type {string} Id of the credit
     */
    this.id = null

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
TrackCreditsEntry.prototype.toFirestore = function() {
  return toFirestore(this)
}
TrackCreditsEntry.prototype.fromFirestore = function(firestoreObject) {
  return fromFirestore(this, firestoreObject)
}
TrackCreditsEntry.fromFirestore = function(firestoreObject) {
  return new TrackCreditsEntry().fromFirestore(firestoreObject)
}


