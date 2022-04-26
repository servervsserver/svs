import { Model } from "./model"

export class Track extends Model {

  constructor () {
    super()

    /**
     * @type {string} Id of the track
     */
    this.id = null

    /**
     * @type {string} Id of the album this track belongs to
     */
    this.album_id = null
    
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
Track.fromFirestore = function(firestoreObject) {
  return new Track().fromFirestore(firestoreObject)
}
