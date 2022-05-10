<template>
  <div class="container">
    <!-- <div class="container"> -->
    <div class="buttons">
      <button
        class="button svs-button-transparent"
        @click="navigateToCollection()"
      >
        <span class="icon">
          <i class="fa-solid fa-arrow-left" />
        </span>
        <span>Back to the collection</span>
      </button>
    </div>
    <track-content 
      v-if="track && album"
      :track="track"
      :album="album"
    />
  </div>
  <!-- </div> -->
</template>

<script>
import TrackContent from "../components/TrackContent.vue"
import * as Archive from "../models"
import { RouterHelperMixin } from "../mixins"
// 0siwEkuLSueDRT8HJabn
export default {
  components: {
    'track-content': TrackContent
  },
  mixins: [
    RouterHelperMixin
  ],
  data() {
    return {
      track: null,
      album: null
    }
  },
  computed: {
    /**
     * @returns {Archive.AsyncCatalog}
     */
    catalog() {
      return this.$svsCatalog.mainCatalog
    }
  },
  async mounted() {
    if (this.$route.params.id) {
      let id = this.$route.params.id
      let track = await this.catalog.asyncGetTrackById(id)
      this.track = track

      if (track) {
        let album = await this.catalog.asyncGetAlbumById(track.albumId)
        this.album = album
      }
    }
  }
}
</script>