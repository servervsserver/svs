<template>
  <section class="award-vote shadow-depth-2">
    <h3>{{ awardVote.label }}</h3>
    <p>{{ awardVote.description }}</p>

    <div v-for="idx in awardVote.options_count" :key="idx">
      <album-selector
        v-if="['album', 'visualizer', 'artwork'].includes(awardVote.target)"
        v-model="selection[idx]"
        :index="idx"
        :albums="albums"
        :collection="collection"
        :servers="servers"
      />

      <track-selector
        v-if="awardVote.target === 'track'"
        v-model="selection[idx]"
        :index="idx"
        :albums="albums"
        :collection="collection"
        :servers="servers"
        :tracks="tracks"
      />
    </div>


  </section>
</template>

<script>
import * as Archive from "../../../modules/catalog/models"
import * as Firestore from "../../../plugins/backend/firestore"
import * as Forms from "../../../modules/forms"

import VoteAlbumSelector from "./VoteAlbumSelector.vue"
import VoteTrackSelector from "./VoteTrackSelector.vue"

export default {
  components: {
    // 'text-input': Forms.TextInputComponent,
    // 'textarea-input': Forms.TextAreaInputComponent,
    // 'select-input': Forms.SelectInputComponent,
    'track-selector': VoteTrackSelector,
    'album-selector': VoteAlbumSelector
  },
  props: {
    /**
     * @type {Firestore.AwardVote}
     */
    awardVote: {
      type: Object,
      default: () => [],
    }, 
    /**
     * @type {Archive.Server[]}
     */
    servers: {
      type: Array,
      default: () => [],
    },
    /**
     * @type {Archive.Album[]}
     */
    albums: {
      type: Array,
      default: () => [],
    },
    /**
     * @type {Map<string,Archive.Track>}
     */
    tracks: {
      type: Map,
      default: () => new Map()
    },
    /**
     * @type {Archive.AlbumCollection}
     */
    collection: {
      type: Archive.AlbumCollection,
      default: null,
    }
  },
  data() {
    return { 
      selectAlbumOption: null,
      innerSelection: []
    }
  },
  computed: {
    selection: {
      get: function() {
        return this.innerSelection
      },
      set: function(value) {
        console.log(value)
        this.innerSelection = value || []
      }
    },
    /**
     * @returns {Archive.AsyncCatalog}
     */
    catalog() {
      return this.$svsCatalog.mainCatalog
    },
    albumOptions() {
      /**
       * @type {Archive.Album[]}
       */
      let albums = this.albums || []
      /**
       * @type {Archive.Server[]}
       */
      let servers = this.servers || []

      let opts = []
      for (let album of albums) {
        let sId = album.author
        let server = servers.find(server => server.id === sId)
        let opt = `${album.title} - ${server.name}`
        opts.push(opt)
      }

      return opts
    }
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