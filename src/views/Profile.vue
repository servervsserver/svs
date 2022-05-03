<template>
  <section class="container">
    <div class="spacer" />
    <profile
      v-if="user"
      :user="user"
    />
    <album-info
      v-if="isLeader && album"
      :album="album" 
      :tracks="tracks"
      :credits="tracksCredits"
    />
    <blockquote v-if="isLeader && !album && !fetchingAlbum">
      No album submitted
    </blockquote>
    <blockquote v-if="fetchingAlbum">
      Trying to fetch your submission...
      <spinner />
    </blockquote>
  </section>
</template>



<script>
import { User } from "@/models/dto/user"
import Profile from "@/components/Profile.vue"
import AlbumInfoComponent from '@/components/AlbumInfo.vue'
import Spinner from "@/components/Spinner.vue";

export default {
  components: {
    'profile': Profile,
    'album-info': AlbumInfoComponent,
    spinner: Spinner,
  },
  data() {
    return {
      server: null,
      album: null,
      tracks: null,
      tracksCredits: null,
      fetchingAlbum: false
    }
  },
  computed: {
    user() {
      return this.$svsAuth.user
    },
    isLeader() {
      if (!this.user) return false;
      return this.user.isServerLeader;
    },
    serverId() {
      // let def = 'ZqzdC97vJjnEi6V0qTvn'
      let def = ''
      if (!this.server || !this.server.id) return def
      return this.server.id
    }
  },
  mounted() {
    setTimeout(() => { this.onUserChange() }, 100)
  },
  methods: {
    async onUserChange() {
      let user = this.$svsAuth.user;
      if (!user) {
        this.server = null;
        console.log("No user logged");
        return;
      }
      if (!user.discordTag) {
        this.server = null;
        console.log("No discord tag");
        return;
      }
      let discordTag = user.discordTag;
      try {
        this.server = undefined;
        this.server = await this.$svsBackend.getServerOfLeader(discordTag);
        await this.getAlbumsOfServer()
      } catch (error) {
        console.warn("Not a leader!");
      }
    },
    async getAlbumsOfServer() {
      // HwzeRGXLSePS0yaHmwyb
      let album = null
      try {
        this.fetchingAlbum = true
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

        // console.log(album, tracks, credits)

        this.album = album
        this.tracks = tracks
        this.tracksCredits = credits
        this.fetchingAlbum = false
      } catch(error) {
        console.log(error)
        console.error("Couldn't retrieve any album")
        this.fetchingAlbum = false
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
