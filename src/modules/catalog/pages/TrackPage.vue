<template>
  <div class="container">
    <track-content 
      v-if="track && album"
      :track="track"
      :album="album"
    />
  </div>
</template>

<script>
import TrackContent from "../components/TrackContent.vue"
import * as Archive from "../models"
// 0siwEkuLSueDRT8HJabn
export default {
  components: {
    'track-content': TrackContent
  },
  data() {
    return {
      track: null,
      album: null
    }
  },
  async mounted() {
    console.log(this.$route)
    if (this.$route.params.id) {
      let id = this.$route.params.id
      let track = await this.catalog.asyncGetTrackById(id)
      this.track = track

      if (track) {
        let album = await this.catalog.asyncGetAlbumById(track.albumId)
        this.album = album
      }
      console.log(this.track, this.album)
    }
  },
  computed: {
    /**
     * @returns {Archive.AsyncCatalog}
     */
    catalog() {
      return this.$svsCatalog.mainCatalog
    }
  }
}
</script>