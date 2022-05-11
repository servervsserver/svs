<template>
  <div class="container">
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
    <album-content
      v-if="album && server"
      :server="server"
      :album="album"
      :tracks="tracks"
      :mock-tracks-count="mockTracksCount"
      :loading-tracks="loadingTracks"
    >
      <template v-slot:tracksTopButtons="slotProps">
        <button 
          v-for="(action, actionidx) in tracksTopActions"
          :key="'action' + actionidx"
          class="button svs-button-transparent"
          @click="action.fnc(slotProps.tracks)"
        >
          <span v-if="action.text">{{ action.text }}</span>
          <span
            v-if="action.icon && action.icon.klass"
            class="icon"
          >
            <i 
              :class="action.icon.klass"
            />
          </span>
        </button>
      </template>

      <template v-slot:trackButtons="slotProps">
        <button 
          v-for="(action, actionidx) in trackListItemsActions"
          :key="'action' + actionidx"
          class="button svs-button-transparent"
          @click="action.fnc(slotProps.track, slotProps.index)"
        >
          <span
            v-if="action.icon && action.icon.klass"
            class="icon"
          >
            <i 
              :class="action.icon.klass"
            />
          </span>
          <span v-if="action.text">{{ action.text }}</span>
        </button>
      </template>
    </album-content>
  </div>
</template>

<script>
import AlbumContentComponent from "../components/AlbumContent.vue"
import * as Archive from "../models"
import { RouterHelperMixin } from "../mixins"

import * as AudioPlayerLogic from "@/modules/audio-player/models"

// nzZHljEmYDS9M6jwFlCs
export default {
  components: {
    'album-content': AlbumContentComponent
  },
  mixins: [
    RouterHelperMixin
  ],
  data() {
    return {
      /**
       * @type {Archive.Album}
       */
      album: null,
      /**
       * @type {Archive.Server}
       */
      server: null,
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
  computed: {
    catalogPlugin() {
      return this.$svsCatalog
    },
    trackListItemsActions() {
      return this.catalogPlugin.trackListItemActions
    },
    tracksTopActions() {
      console.log(this.catalogPlugin.tracksTopActions)
      return this.catalogPlugin.tracksTopActions
    },
    audioPlayer() {
      return this.$svsAudioPlayer.mainAudioPlayer
    },
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
  async mounted() {
    
    if (this.$route.params.id) {
      let id = this.$route.params.id
      let album = await this.catalog.asyncGetAlbumById(id)
      let server = await this.catalog.asyncGetServerById(album.author)

      this.album = album
      this.server = server

      this.tracks = []
      for( let trackId of album.trackIds ) {
        let track = await this.catalog.asyncGetTrackById(trackId)
        this.tracks.push(track)
      }
    }
  }
}
</script>
