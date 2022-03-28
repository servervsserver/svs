import { Model } from "./model"

export class Album extends Model {

  constructor() {
    super()
    
    /**
     * @type {string} Id of the Album
     */
    this.id = null

    /**
     * @type {string} Name of the Album
     */
    this.name = ""

    /**
     * @type {string} Url to the cover art
     */
    this.coverart_url = ""

    /**
     * @type {string} Link to stream the full Album
     */
    this.streaminglink = ""

    /**
     * @type {Array<string>} Array of the ids of the tracks in order
     */
    this.tracks_ids = []

  }
}

/**
 * @type {string} Collection of this model
 */
 Album.collection = "albums"
 Album.fromFirestore = function(firestoreObject) {
  return new Album().fromFirestore(firestoreObject)
}