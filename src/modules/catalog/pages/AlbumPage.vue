<template>
  <div>
    <album-content
      v-if="album"
      :album="album"
      :tracks="tracks"
      :mockTracksCount="mockTracksCount"
      :loading-tracks="loadingTracks"
      @track-click="onTrackClick" 
    />
  </div>
</template>

<script>
import AlbumContentComponent from "../components/AlbumContent.vue"
import * as Archive from "../models"


// nzZHljEmYDS9M6jwFlCs
export default {
  components: {
    'album-content': AlbumContentComponent
  },
  data() {
    return {
      /**
       * @type {Archive.Album}
       */
      album: null,
      /**
       * @type {Archive.Track[]}
       */
      tracks: null,
      /**
       * @type {boolean}
       */
      loadingTracks: false,
    }
  },
  async mounted() {
    console.log(this.$route)
    if (this.$route.params.id) {
      let id = this.$route.params.id
      let album = await this.catalog.asyncGetAlbumById(id)
      this.album = album

      this.tracks = []
      for( let trackId of album.trackIds ) {
        let track = await this.catalog.asyncGetTrackById(trackId)
        this.tracks.push(track)
      }
      console.log(this.tracks)
    }
  },
  computed: {
    mockTracksCount() {
      if (!this.album) return 0
      let tot = this.album.trackIds.length
      let loadedCount = this.tracks ? this.tracks.length : 0
      return tot - loadedCount
    },
    /**
     * @returns {Archive.AsyncCatalog}
     */
    catalog() {
      return this.$svsCatalog.mainCatalog
    }
  },
  methods: {
    onTrackClick($event) {

    }
  }
}
</script>
