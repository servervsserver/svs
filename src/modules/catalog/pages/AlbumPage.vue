<template>
  <div class="container">
    <div class="buttons">
      <button class="button svs-button-transparent" @click="navigateToCollection()">
        <span class="icon">
          <i class="fa-solid fa-arrow-left"></i>
        </span>
        <span>Back to the collection</span>
      </button>
    </div>
    <album-content
      v-if="album && server"
      :server="server"
      :album="album"
      :tracks="tracks"
      :mockTracksCount="mockTracksCount"
      :loading-tracks="loadingTracks"
      v-slot:default="slotProps"
    >
      <template>
        <button class="button svs-fab-button-transparent" @click="play(slotProps.track)">
          <span class="icon">
            <i class="fa-solid fa-circle-play">
            </i>
          </span>
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
  mixins: [
    RouterHelperMixin
  ],
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
  },
  computed: {
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
  methods: {
    play(track) {
      console.log(this)
      let aplTrack = new AudioPlayerLogic.Track(
        track.id, 
        track.title, 
        this.album.title, 
        track.trackUrl
      )
      aplTrack.album = this.album
      if (this.audioPlayer.pushAsNextTrack(aplTrack))
        this.audioPlayer.next()
      else {
        this.audioPlayer.moveToTrack(aplTrack)
      }

      this.audioPlayer.play()
    }
  }
}
</script>
