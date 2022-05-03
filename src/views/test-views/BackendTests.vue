<template>
  <div class="container">
    <h1>Backend tests</h1>
    <div>
      Write the admins to server map in Firebase
      <button
        class="button"
        @click="writeAdminServMap"
      >
        Update
      </button>
    </div>
    <hr>
    <div class="columns">
      <div class="column is-3">
        <text-input
          v-model="server_id"
          :label="'Server id'"
        />
      </div>
      <div class="column is-3">
        <text-input
          v-model="album_id"
          :label="'Album id'"
        />
      </div>
      <div class="column is-3">
        <text-input
          v-model="event_id"
          :label="'Event id'"
        />
      </div>
    </div>
    <button
      class="button"
      @click="writeSomethingToCatalogs"
    >
      Write
    </button>
    <hr>
    <div class="columns">
      <div class="column is-3">
        <text-input
          v-model="server_id"
          :label="'Server id'"
        />
      </div>
    </div>
    <button
      class="button"
      @click="getAlbumsOfServer"
    >
      Retrieve
    </button>
    <album-info 
      :album="album" 
      :tracks="tracks"
      :credits="tracksCredits"
    />
  </div>
</template>

<script>

import TextInputComponent from "@/modules/forms/components/fields/TextInput.vue"
import AlbumInfoComponent from '@/components/AlbumInfo.vue'

export default {
  components: {
    'text-input': TextInputComponent,
    'album-info': AlbumInfoComponent
  },
  data: () => {
    return {
      server_id: "HwzeRGXLSePS0yaHmwyb",
      album_id: null,
      event_id: "svs_iv",
      album: null,
      tracks: null,
      tracksCredits: null
    }
  },
  async mounted() {
    
  },
  methods: {
    async writeAdminServMap() {
      let res = await this.$svsBackend.writeAdminServMap()
      console.log(res)
    },
    async writeSomethingToCatalogs() {
      await this.$svsBackend.writeAlbumInServerCatalog(this.album_id, this.event_id, this.server_id)
      await this.$svsBackend.writeAlbumInEventCatalog(this.album_id, this.event_id, this.server_id)
    },
    async getAlbumsOfServer() {
      // HwzeRGXLSePS0yaHmwyb
      let album = null
      try {
        let [album] = await this.$svsBackend.getAlbumsOfServer(this.server_id)
        if (!album) return

        let tracks = []
        let credits = {}
        for (let trackId of album.tracks_ids) {
          let track = await this.$svsBackend.getTrackById(trackId)
          tracks.push(track)
          credits[trackId] = []

          for (let credits_id of track.credits_ids) {
            let c = await this.$svsBackend.getTrackCreditsEntryById(credits_id)
            credits[trackId].push(c)
          }
        }

        console.log(album, tracks, credits)

        this.album = album
        this.tracks = tracks
        this.tracksCredits = credits

      } catch(error) {
        console.log(error)
        console.error("Couldn't retrieve any album")
        return false
      }
    }
    
  }
}
</script>