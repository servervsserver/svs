import { Model } from "../core/model"

export class Voter {

}

export class DiscordVoter extends Voter {

  constructor() {
    /**
     * @type {string} Id of the voter
     */
    this.id = null

    /**
     * @type {string} Discord tag of the voter
     */
    this.discord_tag = null

  }

}

export class AwardVoteEntry extends Model {
  
  constructor() {
    super()

    /**
     * @type {string} Id of the award vote
     */
    this.id = null

    /**
     * @type {Voter} Label of the vote
     */
    this.voter = null

    /**
     * @type {string} Id of the server this person is voting for
     */
    this.voted_on_behalf_of = null

    /**
     * @type {Date} Description of the vote
     */
    this.submission_date = new Date()

    /**
     * @type {string} Id of the award this vote is for
     */
    this.award_id = null

    /**
     * @type {string[]} Identifiers of what the vote entry is casted for
     */
    this.vote_for = []

  }

}

AwardVoteEntry.collection = "award_vote_entries"
AwardVoteEntry.fromFirestore = function(firestoreObject) {
  return new AwardVoteEntry().fromFirestore(firestoreObject)
}