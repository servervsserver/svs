<template>
  <section class="container">
    <div class="spacer" />
    <profile v-if="user" :user="user" />
    <album-info 
      :album='album' 
      :tracks='tracks'
      :credits='tracksCredits'
      />
  </section>
</template>



<script>
import { User } from "@/models/dto/user"
import Profile from "@/components/Profile.vue"
import AlbumInfoComponent from '@/components/AlbumInfo.vue'

export default {
  components: {
    'profile': Profile,
    'album-info': AlbumInfoComponent
  },
  computed: {
    user() {
      console.log(this.$svsAuth.user)
      return this.$svsAuth.user
    },
    serverId() {
      return 'HwzeRGXLSePS0yaHmwyb'
    }
  },
  data() {
    return {
      album: null,
      tracks: null,
      tracksCredits: null
    }
  },
  mounted() {
    setTimeout(() => { this.getAlbumsOfServer() }, 1000)
  },
  methods: {
    async getAlbumsOfServer() {
      // HwzeRGXLSePS0yaHmwyb
      let album = null
      try {
        let [album] = await this.$svsBackend.getAlbumsOfServer(this.serverId)
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

<style lang="scss" scoped>
.spacer {
  height: 100px;
}
</style>
