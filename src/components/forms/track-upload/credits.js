import { v4 as generateUuid } from "uuid"

export default class CreditEntry {

  constructor() {
    /**
    * {string} uuid generated on instanciation to help vue identify objects
    */
    this._vueId = generateUuid()

    /**
    * {string} Artist name if applicable
    */
    this.artistName = ""

    /**
    * {string} Discord tag of the person
    */
    this.discordTag = ""

    /**
    * {string} Short description of what they did
    */
    this.description = ""

    /**
    * {boolean} If true, the person will be listed as anonymous publicly
    */
    this.anonymous = false
  }

  get vueId() {
    return this._vueId
  }
}
