import { Model } from "./model"

export class AlbumCollection extends Model {


  constructor() {
    super()
   
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
    this.albums_ids = []

    /**
     * @type {Subcollection[]} Subcollections
     */
    this.sub_collections = []

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
    this.albums_ids = []

  }

}

AlbumCollection.collection = "album_collections"
AlbumCollection.fromFirestore = function(firestoreObject) {
  return new AlbumCollection().fromFirestore(firestoreObject)
}