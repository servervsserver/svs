export class AlbumCollection {

  constructor() {
    /**
     * @type {string} Id of the collection
     */
    this.id = null

    /**
     * @type {string} Name of the collection
     */
    this.name = ""

    /**
     * @type {string} Description of the collection
     */
    this.description = ""

    /**
     * @type {string[]} Album ids
     */
    this.albumsIds = []

    /**
     * @type {Subcollection[]} Subcollections
     */
    this.subCollections = []

  }

}

export class AlbumSubcollection {

  constructor() {

    /**
     * @type {string} Name of the subcollection
     */
    this.name = ""

    /**
     * @type {string} Description of the subcollection
     */
    this.description = ""

    /**
     * @type {string[]}
     */
    this.albumsIds = []

  }

}
