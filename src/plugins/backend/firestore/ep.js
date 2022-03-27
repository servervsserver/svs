import { toFirestore, fromFirestore } from "./utils"

export class Ep {

  constructor() {

    /**
     * @type {string} Id of the EP
     */
    this.id = null

    /**
     * @type {string} Name of the EP
     */
    this.name = ""

    /**
     * @type {string} Url to the cover art
     */
    this.coverart_url = ""

    /**
     * @type {string} Link to stream the full EP
     */
    this.streaminglink = ""

    /**
     * @type {Array<string>} Array of the ids of the tracks in order
     */
    this.tracks_ids = []

  }
}

Ep.collection = "albums"
Ep.prototype.toFirestore = function() {
  return toFirestore(this)
}
Ep.prototype.fromFirestore = function(firestoreObject) {
  return fromFirestore(this, firestoreObject)
}
Ep.fromFirestore = function(firestoreObject) {
  return new Ep().fromFirestore(firestoreObject)
}