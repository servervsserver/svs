import { Model } from "./model"

export class Server extends Model {

  constructor() {
    super()

    /**
     * @type {string}
     */
    this.id = null

    /**
     * @type {string} Name of the server
     */
    this.name = ""

    /**
     * @type {string} Url of the icon of the server
     */
    this.icon_url = ""

    /**
     * @type {Array<string>} Discord tag of the admins of the server
     */
    this.admins = []

    /**
     * @type {string} Short description of the server
     */
    this.description = ""
  }
}

/**
 * @type {string} Collection of this model
 */
 Server.collection = "servers"
 Server.fromFirestore = function(firestoreObject) {
  return new Server().fromFirestore(firestoreObject)
}