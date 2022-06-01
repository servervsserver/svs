<template>
  <section class="container">
    <h1>Awards list</h1>
    <p>
      List of the awards of SvS IV
    </p>
    <div>
      <div class="columns has-text-centered">
        <div class="column is-4">
          <strong>Compare the algorithms:</strong>
        </div>
        <div class="column is-4">
          <select-input
            v-model="leftAlgorithmName"
            :label="'Left algorithm'"
            :options="algorithmsOptions"
          />
        </div>
        <div class="column is-4">
          <select-input
            v-model="rightAlgorithmName"
            :label="'Right algorithm'"
            :options="algorithmsOptions"
          />
        </div>
      </div>
    </div>
    <div class="columns has-text-centered">
      <div class="column is-4">
        Info shown:
      </div>
      <div class="column is-4">
        <select-input
          v-model="infoShownOption"
          :label="'Info shown'"
          :options="infoShownOptions"
        />
      </div>
    </div>
    <div class="columns is-multiline">
      <div 
        v-for="av in awardVotesList"
        :key="'res-' + av.id"
        class="column is-12"
      >
        <div
          class="shadow-depth-2"
          style="padding: 10px;"
        >
          <h2>{{ av.label }} <em class="tag">{{ av.id }}</em></h2>
          <p>{{ av.description }}</p>
          <blockquote class="columns is-mobile">

            <div class="column is-6" v-for="(algorithm, idx) in [leftAlgorithmName, rightAlgorithmName]" :key="idx">
              <h3>Results {{algorithm}}</h3>
              <div class="vote-results">
                <table>
                  <tr>
                    <th>Rank</th>
                    <th><span style="font-size: 0.6em;">Rank with skips</span></th>
                    <th>Vote</th>
                    <th>Count</th>
                  </tr>
                  <tr
                    v-for="res in pickAlgorithm(algorithm)(av)"
                    :key="'res-old-' + av.id + '-' + res.id"
                    :class="{ 'underlined': infoShownOption === 'full', 'not-in-cut': res.rank > 3, 'first': res.rank == 1, 'second': res.rank == 2, 'third': res.rank == 3 }"
                  >
                    <td> <span class="tag">{{ res.rank }}</span></td>
                    <td> <span class="tag is-primary">{{ res.rankWithSkip }}</span></td>
                    <td>
                      <div v-if="infoShownOption === 'id'">
                        {{ res.id }}
                      </div>
                      
                      <div v-if="infoShownOption === 'title'">
                        <span v-if="av.target === 'track'">
                          {{ tracks.get(res.id).title}}
                        </span>
                        <span v-if="av.target !== 'track'">
                          {{ albums.get(res.id).title}}
                        </span>
                      </div>

                      <div v-if="infoShownOption === 'full'" style="font-size: 0.8em;">
                        <div v-if="av.target === 'track'">
                          <sub>Tr</sub> {{ tracks.get(res.id).title}} <br/>
                          <sub>In</sub> {{ albums.get(tracks.get(res.id).albumId).title}} <br/>
                          <sub>By</sub> {{ servers.get(albums.get(tracks.get(res.id).albumId).author).name}}
                        </div>
                        <span v-if="av.target !== 'track'">
                          <sub>EP</sub> {{ albums.get(res.id).title}} <br/>
                          <sub>By</sub> {{ servers.get(albums.get(res.id).author).name}}
                        </span>
                      </div>
                    </td>
                    <td> <span class="tag">{{ res.count }}</span></td>
                  </tr>
                </table>
              </div>
            </div>
          </blockquote>

          <h3>Ballots ({{ ballotsOf(av).length }})</h3>
          <div class="ballots">
            <table>
              <tr 
                v-for="ballot in ballotsOf(av)" 
                :key="'ballot-' + av.id + '-' + ballot.id"
              >
                <td class="tag">
                  {{ ballot.id }}
                </td> 
                <td>{{ ballot.voter.discord_tag }}</td>
                <td>
                  <span v-if="infoShownOption === 'id'">{{ ballot.voted_on_behalf_of }}</span>
                  <span v-if="infoShownOption !== 'id'">{{ ballot.voted_on_behalf_of != '-1' ? servers.get(ballot.voted_on_behalf_of).name : 'Community vote'}}</span>
                </td>
              </tr>
            </table>
          </div>
          <div class="columns">
            <div class="column is-12">
              <h3>Per server votes</h3>
              <div class="per-server-vote-block">
                <div
                  v-for="[id, re] in perServerVotesOf(av)" 
                  :key="'psvo-' + av.id + '-' + id"
                >
                  <strong>
                    <span v-if="infoShownOption === 'id'">{{ id }}</span>
                    <span v-if="infoShownOption !== 'id'">{{ id != '-1' ? servers.get(id).name : 'Community vote'}}</span>
                  </strong>
                  <table>
                    <tr>
                      <th>Vote</th>
                      <th>Count</th>
                    </tr>
                    <tr 
                      v-for="[clid, c] in re.castList" 
                      :key="'psvo-' + av.id + '-' + id + '-' + clid"
                    >
                      <td>
                        <div v-if="infoShownOption === 'id'">
                          {{ clid }}
                        </div>

                        <div v-if="infoShownOption === 'title'">
                          <span v-if="av.target === 'track'">
                            {{ tracks.get(clid).title}}
                          </span>
                          <span v-if="av.target !== 'track'">
                            {{ albums.get(clid).title}}
                          </span>
                        </div>

                        <div v-if="infoShownOption === 'full'" style="font-size: 0.8em;">
                          <div v-if="av.target === 'track'">
                            <sub>Tr</sub> {{ tracks.get(clid).title}}
                            <sub>In</sub> {{ albums.get(tracks.get(clid).albumId).title}}
                            <sub>By</sub> {{ servers.get(albums.get(tracks.get(clid).albumId).author).name}}
                          </div>
                          <span v-if="av.target !== 'track'">
                            <sub>EP</sub> {{ albums.get(clid).title}}
                            <sub>By</sub> {{ servers.get(albums.get(clid).author).name}}
                          </span>
                        </div>
                      </td>
                      <td class="tag">
                        {{ c.length }}
                      </td>
                    </tr>
                  </table>
                  <hr>
                </div>
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
import * as Forms from "../../../modules/forms";
import { getResultsOf, getResultsOf_ReproducedBug, getPopularResultsOf } from "../../../models/vote"
import TooltipVue from '@/components/Tooltip.vue'

export default {
  components: {
    // 'tooltip': TooltipVue,
    "select-input": Forms.SelectInputComponent,
  },
  data() {
    return { 
      /**
       * @type {Firestore.AwardVote[]}
       */
      awardVotesList: [],
      /**
       * @type {Firestore.AwardVoteEntry[]}
       */
      awardVoteEntries: [],
      tracks: new Map(),
      albums: new Map(),
      servers: new Map(),
      leftAlgorithmName: "v0-bug",
      rightAlgorithmName: "reproduced-bug",
      algorithmsOptions: [
        "v0-bug",
        "reproduced-bug",
        "fixed",
        "popular"
      ],
      infoShownOption: "id",
      infoShownOptions: [
        "id",
        "title",
        "full"
      ]
    }
  },
  async mounted() {
    /**
     * @type {Map<string, Firestore.AwardVote>}
     */
    let avsMap = await this.$svsBackend.getAllAwardVotes()
    /**
     * @type {Map<string, Firestore.AwardVoteEntry>}
     */
    let avsEntries = await this.$svsBackend.getAllAwardVoteEntries()
    // let avsMap = {}
    // let avsEntries = {}

    let avs = []
    for (let avid in avsMap) {
      avs.push(avsMap[avid])
    }

    /**
     * @type {Firestore.AwardVoteEntry[]}
     */
    let aves = []
    for (let aveid in avsEntries) {
      aves.push(avsEntries[aveid])
    }

    aves.forEach((v) => {
      let awardVote = avsMap[v.award_id]
      this.$svsCatalog.mainCatalog.asyncGetServerById(v.voted_on_behalf_of).then(server => {
        if (!server) return
        this.servers.set(server.id, server)
      })
      .catch(err => {
        console.warn(v)
      })

      if (awardVote.target === 'track') {
        v.vote_for.forEach((value) => {
          this.$svsCatalog.mainCatalog.asyncGetTrackById(value).then(track => {
            this.tracks.set(track.id, track)
            this.$svsCatalog.mainCatalog.asyncGetAlbumById(track.albumId).then(album => {
              this.albums.set(album.id, album)
              this.$svsCatalog.mainCatalog.asyncGetServerById(album.author).then(server => {
                this.servers.set(server.id, server)
              })
            })
          })
        })
      } else {
        v.vote_for.forEach((value) => {
          this.$svsCatalog.mainCatalog.asyncGetAlbumById(value).then(album => {
            this.albums.set(album.id, album)
            this.$svsCatalog.mainCatalog.asyncGetServerById(album.author).then(server => {
              this.servers.set(server.id, server)
            })
          })
        })
      }
    })

    this.awardVoteEntries = aves
    this.awardVotesList = avs.filter(av => av.album_collection_id === 'svs-iv')
  },
  computed: {
    leftAlgorithm() {
      return this.pickAlgorithm(this.leftAlgorithmName)
    },
    rightAlgorithm() {
      return this.pickAlgorithm(this.rightAlgorithmName)
    }
  },
  methods: {
    pickAlgorithm(name) {
      switch(name) {
        case "fixed": 
          return (awardVote) => getResultsOf(awardVote, this.awardVoteEntries);
        case "popular": 
          return (awardVote) => getPopularResultsOf(awardVote, this.awardVoteEntries)
        case "reproduced-bug":
          return (awardVote) => getResultsOf_ReproducedBug(awardVote, this.awardVoteEntries);
        case "v0-bug": 
          return (awardVote) => {
            return this.resultsOfOld(awardVote)
          }
      }
      return (_) => null
    },
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
    resultsOfOld(awardVote) {
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
    },
    /**
     * @param {Firestore.AwardVote} awardVote
     */
    resultsOf(awardVote) {
      let res = getResultsOf(awardVote, this.awardVoteEntries)
      return res
    }
  }
}
</script>

<style scoped lang="scss">
.ballots {
  padding-left: 2em;
  max-height: 200px;
  overflow: visible scroll;
}

.per-server-vote-block {
  max-height: 200px;
  overflow: visible scroll;
}

.vote-results {
  max-height: 600px;
  overflow: visible scroll;
}

table {
  width: 100%;

  th {
    color: white !important;
  }

  td {
    vertical-align: middle;
  }

}
.vote-results {
  .underlined {
    border-bottom: 1px solid grey;
  }

  tr.not-in-cut {
    // opacity: 0.5;
    filter: grayscale(0.5) brightness(0.7) contrast(0.6);
  }
  
  tr:not(.not-in-cut) {
    background: #0003;
  }

  .first {
    text-shadow: 2px 2px 0px #333377;
    box-shadow: 0 0 2px 0px #0008, 0 0 20px 20px #fa04 inset;
    & > * { font-weight: 600 !important; }
  }

  .second {
    box-shadow: 0 0 1px 0px #0008, 0 0 20px 20px #8884 inset;
    & > * { font-weight: 600 !important; }
  }

  .third {
    opacity: 1;
  }
}
</style>