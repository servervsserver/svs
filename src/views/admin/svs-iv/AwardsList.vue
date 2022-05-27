<template>
  <section class="container">
    <h1>Awards list</h1>
    <p>
      List of the awards of SvS IV
    </p>
    <div class="columns is-multiline">
      <div 
        v-for="av in awardVotesList" 
        :key="av.id" 
        class="column is-12"
      >
        <div
          class="shadow-depth-2"
          style="padding: 10px;"
        >
          <h2>{{ av.label }} <em class="tag">{{ av.id }}</em></h2>
          <p>{{ av.description }}</p>
          <div>
            Collection key: {{ av.album_collection_id }}
          </div>
          <div>
            Target: {{ av.target }}
          </div>
          <div>
            Type: {{ av.type }}
          </div>
          <div>
            Options count: {{ av.options_count }}
          </div>
          <blockquote>
            <div>Opening the: {{ av.opening_date | date("DAY, dd MONTH yyyy") }} | {{ av.opening_date | date("hour:min", true) }}</div>
            <div>Closing the: {{ av.closing_date | date("DAY, dd MONTH yyyy") }} | {{ av.closing_date | date("hour:min", true) }}</div>
          </blockquote>
        </div>
      </div>
    </div>
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
      awardVotesList: []
    }
  },
  async mounted() {
    /**
     * @type {Firestore.AwardVote[]}
     */
    let avsMap = await this.$svsBackend.getAllAwardVotes()
    console.log(avsMap)
    let avs = []
    for (let avid in avsMap) {
      avs.push(avsMap[avid])
    } 
    this.awardVotesList = avs.filter(av => av.album_collection_id === 'svs-iv')
  }
}
</script>