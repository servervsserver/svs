<template>
  <section class="container">
    <h1>Awards list</h1>
    <p>
      List of the awards of SvS IV
    </p>
    <div class="columns is-multiline">
      <div 
        class="column is-12"
        v-for="av in awardVotesList"
        :key="'res-' + av.id"
        >
        <div class="shadow-depth-2" style="padding: 10px;">
          <h2>{{av.label}} <em class="tag">{{av.id}}</em></h2>
          <p>{{av.description}}</p>
          <h3>Ballots ({{ballotsOf(av).length}})</h3>
          <div class="ballots">
            <table>
              <tr 
                v-for="ballot in ballotsOf(av)" 
                :key="'ballot-' + av.id + '-' + ballot.id"
                >
                <td class="tag">{{ballot.id}}</td> 
                <td>{{ballot.voter.discord_tag}}</td>
                <td>{{ballot.voted_on_behalf_of}}</td>
              </tr>
            </table>
          </div>
          <div class="columns is-mobile">
            <div class="column is-6">
              <h3>Per server votes</h3>
              <div class="per-server-vote-block">
                <div
                    v-for="[id, re] in perServerVotesOf(av)" 
                    :key="'psvo-' + av.id + '-' + id"
                >
                  <strong>{{id}}</strong>
                  <table>
                    <tr 
                      v-for="[clid, c] in re.castList" 
                      :key="'psvo-' + av.id + '-' + id + '-' + clid"
                      >
                      <td>{{clid}}</td>
                      <td class="tag">{{c.length}}</td>
                      <!-- <td>{{ballot.voter.discord_tag}}</td>
                      <td>{{ballot.voted_on_behalf_of}}</td> -->
                    </tr>
                  </table>
                  <hr/>
                </div>

              </div>
            </div>
            <div class="column is-6">
              <h3>Results</h3>
              <div class="per-server-vote-block">
                <table>
                  <tr>
                    <th>Rank</th>
                    <th>Rank w skips</th>
                    <th>Vote</th>
                    <th>Count</th>
                  </tr>
                  <tr v-for="res in resultsOf(av)" :key="'res-' + av.id + '-' + res.id">
                    <td> <span class="tag">{{res.rank}}</span></td>
                    <td> <span class="tag is-primary">{{res.rankWithSkip}}</span></td>
                    <td>{{res.id}}</td>
                    <td> <span  class="tag">{{res.count}}</span></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="columns is-multiline">
      <div 
        class="column is-12" 
        v-for="av in awardVotesList" 
        :key="av.id"
      >
        <div class="shadow-depth-2" style="padding: 10px;">
          <h2>{{av.label}} <em class="tag">{{av.id}}</em></h2>
          <p>{{av.description}}</p>
          <div>
            Collection key: {{av.album_collection_id}}
          </div>
          <div>
            Target: {{av.target}}
          </div>
          <div>
            Type: {{av.type}}
          </div>
          <div>
            Options count: {{av.options_count}}
          </div>
        </div>
      </div>
    </div> -->
  </section>
</template>

<script>
import * as Firestore from "../../../plugins/backend/firestore"

export default {
  data() {
    return { 
      /**
       * @type {Firestore.AwardVote[]}
       */
      awardVotesList: [],
      /**
       * @type {Firestore.AwardVoteEntry[]}
       */
      awardVoteEntries: null
    }
  },
  async mounted() {
    /**
     * @type {Firestore.AwardVote[]}
     */
    let avsMap = await this.$svsBackend.getAllAwardVotes()
    let avsEntries = await this.$svsBackend.getAllAwardVoteEntries()
    
    let avs = []
    for (let avid in avsMap) {
      avs.push(avsMap[avid])
    }

    let aves = []
    for (let aveid in avsEntries) {
      aves.push(avsEntries[aveid])
    }
    this.awardVoteEntries = aves
    this.awardVotesList = avs.filter(av => av.album_collection_id === 'svs-iv')
  },
  methods: {
   ballotsOf(awardVote)  {
     // Only keep this award entries
     let voteEntries = this.awardVoteEntries
      .filter(ave => ave.award_id === awardVote.id)

    // Remove dups base on submission date
    voteEntries = voteEntries.filter(ave => {
        let potDup = voteEntries.find(
          othAve => {
            return (othAve.voter.discord_tag === ave.voter.discord_tag)
              && othAve !== ave
          }
        )
        if (!potDup) return true
        if (ave.submission_date < potDup.submission_date) return false
        return true
      })

    // WARNING Doesn't disregard self votes
     return voteEntries
   },
   perServerVotesOf(awardVote) {
     let ballots = this.ballotsOf(awardVote)
     let rankingEntries = new Map()

    // Agregate the votes per server (it's a map, no order)
     for(let ballot of ballots) {
       let vobo = ballot.voted_on_behalf_of
       if (!rankingEntries.has(vobo))
        rankingEntries.set(vobo, {})
       let re = rankingEntries.get(vobo)
       
       if (!re.castList) re.castList = new Map()

       for (let vf of ballot.vote_for) {
         if (!re.castList.has(vf)) 
          re.castList.set(vf, [])
         re.castList.get(vf).push(ballot)
       }
      }

      return rankingEntries
   },
  resultsOf(awardVote) {
      let rankingEntries = this.perServerVotesOf(awardVote)

      let resultsMap = new Map()

      // Agregate servers votes
      // The strategy is to keep the most voted tracks only until you have enough tracks.
      // Basically first it takes the exactly most voted tracks. 
      // If it's not enough, it will lower the threshold by one vote, until it keeps enough tracks.
      // Enough is the number of options in the award vote (3 for albums, 5 for tracks)
      for (let [sid, re] of rankingEntries) {
        let threshold = 0
        for (let [id, cl] of re.castList) {
          threshold = Math.max(cl.length, threshold)
        }

        let kept = []
        while(kept.length < awardVote.options_count) {
          kept = []
          for (let [id, cl] of re.castList) {
            if (cl.length < threshold) continue
            kept.push({ id: id, casts: cl })
          }
  
          for (let k of kept) {
            resultsMap.set(k.id, 1 + (resultsMap.get(k.id) || 0))
          }
          threshold -= 1
        }
      }
      
      // Transform the map in array so it can be sorted
      let results = []
      resultsMap.forEach((v,k) => {
        results.push({
          id: k,
          count: v,
          rank: 1,
          rankWithSkip: 1
        })
      })
      
      // Sort by most voted
      results.sort((a,b) => b.count - a.count)

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
  },
}
</script>

<style scoped lang="scss">
.ballots {
  padding-left: 2em;
  max-height: 80px;
  overflow-y:scroll;
}

.per-server-vote-block {
  max-height: 400px;
  overflow-y: scroll;
}

table {
  width: 100%;

  th {
    color: white !important;
  }
}
</style>