<template>
  <coming-soon :type="'page'">
    <div class="container">
      <h1>Awards votes!</h1>
      <p>
        Now that we listened to all the EPs, it's time to vote for the awards!<br/>
        You can take your time and listen again to the EPs here:
        <router-link :to="'/svs-iv/radio'">SvS IV EPs</router-link>
      </p>

      <section>
        <h2>Cast your vote</h2>
        <award-vote 
          v-for="av of awardVotesList" 
          :key="av.id" 
          :awardVote="av"
          :collection="collection"
          :albums="albums"
          :servers="servers"
          :tracks="tracks"
          />
      </section>
    </div>
  </coming-soon>
</template>

<script>
import * as Archive from "../../modules/catalog/models"
import * as Forms from "../../modules/forms"
import VoteComponentVue from './vote/VoteComponent.vue'

export default {
  components: {
    // 'text-input': Forms.TextInputComponent,
    // 'textarea-input': Forms.TextAreaInputComponent,
    // 'select-input': Forms.SelectInputComponent
    'award-vote': VoteComponentVue
  },
  data() {
    return { 
      /**
       * @type {Firestore.AwardVote[]}
       */
      awardVotesList: [],
      /**
       * @type {Archive.Server[]}
       */
      servers: [],
      /**
       * @type {Archive.Album[]}
       */
      albums: [],
      /**
       * @type {Map<string,Archive.Track>}
       */
      tracks: new Map(),
      /**
       * @type {Archive.AlbumCollection}
       */
      collection: null
    }
  },
  async mounted() {

    // Workaround for catalog not being bridge yet
    setTimeout(
      async () => {
        let collection = await this.catalog.asyncGetAlbumCollectionById('svs-iv')
        this.collection = collection

        /**
         * @type {Firestore.AwardVote[]}
         */
        let avsMap = await this.$svsBackend.getAllAwardVotes()

        let avs = []
        for (let avid in avsMap) {
          avs.push(avsMap[avid])
        } 
        this.awardVotesList = avs.filter(av => av.album_collection_id === 'svs-iv')

        this.albums = []
        let albumsIds = collection.albumsIds.slice()
        for (let albumId of albumsIds) {
          let album = await this.catalog.asyncGetAlbumById(albumId)
          let serverId = album.author
          let server = await this.catalog.asyncGetServerById(serverId)
          
          this.servers.push(server)
          this.albums.push(album)
        }

        this.albums.sort((lhs, rhs) => lhs.title.localeCompare(rhs.title))

        for (let album of this.albums) {
          for (let trackId of album.trackIds) {
            let track = await this.catalog.asyncGetTrackById(trackId)
            this.tracks.set(track.id, track)
          }
        }


      }, 150
    )

  },
  computed: {
    /**
     * @returns {Archive.AsyncCatalog}
     */
    catalog() {
      return this.$svsCatalog.mainCatalog
    },
    /**
     * Options
     */
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.award-vote {
  padding: 10px;
  margin: 10px 0;
}
</style>