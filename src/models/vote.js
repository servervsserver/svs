import { AwardVote, AwardVoteEntry } from "../plugins/backend/firestore"


/**
 * Only keep this award entries
 * @param {AwardVote} awardVote 
 * @param {AwardVoteEntry[]} ballots 
 */
export function filterBallotsOf(awardVote, ballots) {
  // if (!ballots) return []
  // debugger;
  let voteEntries = ballots.filter(ave => ave.award_id === awardVote.id)
  return voteEntries
}

/**
 * 
 * @param {AwardVoteEntry[]} ballots 
 */
export function filterDupSubmissions(ballots) {

  // It's a wrong way. Must be changed
  let getDup = (awardVoteEntry) => {
    return ballots.find(oth => {
      return oth.voter.discord_tag === awardVoteEntry.voter.discord_tag
        && oth !== awardVoteEntry
    })
  }

  ballots = ballots.filter(ave => {
    let potDup = getDup(ave)
    if (!potDup) return true
    if (ave.submission_date < potDup.submission_date) return false
    return true
  })
  return ballots
}

export class BallotsGroup {

  /**
   * Creates a new ballot group
   * @param {string} label Label of the group
   */
  constructor(label) {
    
    this.label = label

    this.ballots = []
  }

}

/**
 * 
 * @param {AwardVoteEntry[]} ballots 
 * @returns 
 */
export function groupBallotsPerServer(ballots) {

  /** @type {Map<string, BallotsGroup>} */
  let groups = new Map()
  /**
   * @type {BallotsGroup}
   */
  let grpArr = []

  for (let ballot of ballots) {

    let vobo = ballot.voted_on_behalf_of

    if (!groups.has(vobo)) {
      let grp = new BallotsGroup(vobo)
      groups.set(vobo, grp)
      grpArr.push(grp)
    }

    let group = groups.get(vobo)
    group.ballots.push( ballot )

  }

  return grpArr
}

/**
 * Sort in place
 * @param {BallotsGroup[]} groups 
 */
export function sortBallotsGroupsPerLabel(groups) {
  groups.sort((a, b)=> b.label.localeCompare(a.label))
  return groups
}

/**
 * Count the votes in the ballots
 * @param {AwardVoteEntry[]} ballots
 * @returns A map with the vote as key and the number of occurences as value
 */
export function countVotes(ballots) {

  /** @type {Map<string, number>} */
  let countMap = new Map()
  for(let ballot of ballots) {
    for (let vote of ballot.vote_for) {
      countMap.set(vote, 1 + (countMap.get(vote) || 0))
    }
  }

  return countMap
}

/**
 * 
 * @param {Map<string, number>} countMap 
 */
function getMaxVoteCount(countMap) {
  let max = 0
  countMap.forEach((v, k) => {
    if (v > max) max = v
  })
  return max
}

function getVotesAboveCountThreshold(countMap, threshold) {
  /** @type {Map<string, number>} */
  let resCountMap = new Map()
  countMap.forEach((v, k) => {
    if (v >= threshold) resCountMap.set(k, v)
  })
  return resCountMap
}

/**
 * Get the top voted elements and retrieves at least a certain number.
 * Votes with the same quantity are retrieve atomically
 * @param {Map<string, number>} countMap 
 * @param {number} minimalCount 
 */
function getTopVotes(countMap, minimalCount) {
  
  let threshold = getMaxVoteCount(countMap)
  let res = null
  
  do {
    res = getVotesAboveCountThreshold(countMap, threshold)
    threshold -= 1
  } while(res.size < minimalCount && threshold >= 0);
  
  return res
}

export class VoteResultEntry {

  constructor(id, count) {

    this.id             = id
    this.count          = count

    this.rank           = 1
    this.rankWithSkip   = 1

  }

}

/**
 * 
 * @param {AwardVote} award 
 * @param {AwardVoteEntry[]} ballots 
 */
export function getResultsOf(award, ballots) {

  ballots = filterBallotsOf(award, ballots)
  ballots = filterDupSubmissions(ballots)
  let groups = groupBallotsPerServer(ballots)

  groups = sortBallotsGroupsPerLabel(groups)

  let resultMap = new Map()
  for (let group of groups) {
    let cv = countVotes(group.ballots)
    let ctv = getTopVotes(cv, award.options_count)

    ctv.forEach((v, k) => {
      resultMap.set(k, 1 + (resultMap.get(k) || 0))
    })
  }

  /** @type {VoteResultEntry[]} */
  let results = []
  resultMap.forEach((v,k) => {
    results.push(new VoteResultEntry(k, v))
  })

  // Sort by most voted
  results.sort((a, b) => b.count - a.count)

  // Compute the ranks
  for (let i = 1; i < results.length; i++) {
    let prev = results[i-1]
    let cur = results[i]
    if (prev.count === cur.count) {
      cur.rank = prev.rank
      cur.rankWithSkip = prev.rankWithSkip
    } else {
      cur.rank = prev.rank + 1
      cur.rankWithSkip = i + 1
    }
  }

  return results
}

