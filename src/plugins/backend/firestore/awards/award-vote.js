import { Model, dateFromFirestoreTimestamp } from "../core/model"


// export class EligibilityRule {

// }

/**
 * @typedef {'artwork' | 'visualizer' | 'album' | 'track' } AwardVoteTarget
 * @typedef {'ordered_selection'} AwardVoteType
 */
export class AwardVote extends Model {
  
  constructor() {
    super()

    /**
     * @type {string} Id of the award vote
     */
    this.id = null

    /**
     * @type {string} Label of the vote
     */
    this.label = ""

    /**
     * @type {string} Description of the vote
     */
    this.description = ""

    /**
     * @type {string} Id of the collection receipient of the award vote
     */
    this.album_collection_id = null

    /**
     * @type {AwardVoteTarget} Target of the vote
     */
    this.target = 'album'

    /**
     * @type {any} List of the eligibility rules for a vote
     */
    this.eligibility_rules = []

    /**
     * @type {AwardVoteType} Type of vote
     */
    this.type = 'ordered_selection'

    /**
     * @type {number} Amount of options a voter must select
     */
    this.options_count = 5

    /**
     * @type {Date} Opening date of the vote
     */
     this.opening_date = new Date()

     /**
      * @type {Date} Closing date of the vote
      */
     this.closing_date = new Date()

  }

}

AwardVote.collection = "award_votes"
AwardVote.fromFirestore = function(firestoreObject) {
  let av = new AwardVote()
  av.fromFirestore(firestoreObject)
  av.closing_date = dateFromFirestoreTimestamp(av.closing_date)
  av.opening_date = dateFromFirestoreTimestamp(av.opening_date)
  return av
}