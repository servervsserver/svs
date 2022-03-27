import { v4 as generateUuid } from "uuid"
import CreditEntry from "./credits"

export default class Track {

  constructor() {
    /**
    * {string} uuid generated on instanciation to help vue identify objects
    */
    this._vueId = generateUuid()

    /**
    * {string} name of the track
    */
    this.name = ""

    /**
    * {File} track file
    */
    this.audioFile = null

    /**
    * {string} url to the track file
    */
    this.audioUrl = null

    /**
    * {string} lyrics of the track
    */
    this.lyrics = ""

    /**
    * {string} whether it has lyrics or not (do not send the lyrics if its false)
    */
    this.hasLyrics = false

    /**
    * {string} the music contains profanity and must be labeled Parental Advisory
    */
    this.explicit = false

    /**
    * {string} the genre of the track
    */
    this.genre = null

    /**
    * {string} An other genre that could fit the track
    */
    this.secondGenre = null

    /**
    * {Array<CreditEntry>} Collection of credits
    */
    this._credits = []
  }

  get vueId() {
    return this._vueId
  }

  /**
  * Gets the track filename
  */
  get audioFilename () {
    if (!this.audioFile) return ""
    return this.audioFile.name
  }

  /**
  * {Array[CreditEntry]} Credits
  */
  get credits() {
    return this._credits
  }

  /**
  * Creates and add an entry to the credits
  * @return The credits entry created
  */
  addCreditEntry () {
    let creditEntry = new CreditEntry()
    this._credits.push(creditEntry)
    return creditEntry
  }

  /**
  * Removes a credit entry
  */
  removeCreditEntry (creditEntry) {
    let idx = this._credits.indexOf(creditEntry)
    if (idx == -1) return null
    this._credits.splice(idx, 1)
    return creditEntry
  }

}
