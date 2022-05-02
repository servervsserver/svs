<template>
  <section>
    <h1>Catalog</h1>
    <section
      v-if="catalogLoading"
      class="ep-collection-loading"
    />
    <section
      v-if="!catalogLoading"
    >
      <albums-list 
        :albums="allEps" 
        @album-click="onAlbumClick"
      />
      <album-content
        v-if="activeAlbum"
        :album="activeAlbum"
        :tracks="activeAlbumTracks"
        @track-click="onTrackClick"
      />
      <!-- <audio-player :audio-player="$svsAudioPlayer.player"/> -->
    </section>
  </section>
</template>

<script>
import AudioPlayer from "@/modules/audio-player/components/AudioPlayer.vue"
import * as AudioPlayerLogic from "@/modules/audio-player/models"

import * as Archive from "@/modules/catalog/models"
import AlbumListComponent from "@/modules/catalog/components/AlbumsList.vue"
import AlbumContentComponent from "@/modules/catalog/components/AlbumContent.vue"

export default {
  components: {
    'albums-list': AlbumListComponent,
    'album-content': AlbumContentComponent,
    // 'audio-player': AudioPlayer
  },
  data() {
    return {
      catalog: null,
      catalogLoading: true,
      activeAlbum: null,
      activeAlbumTracks: [],
      allEps: []
    }
  },
  computed: {
    audioPlayer() {
      return this.$svsAudioPlayer.mainAudioPlayer
    }
  },
  mounted() {
      let catalog = new Archive.Catalog()
      this.catalog = catalog
      this.catalogLoading = false
      // this.getAllEps()
      // this.getAllTracks()
  },
  methods: {
    async getAllEps() {
      let fAllEpsMap = await this.$svsBackend.getAllEps()
      for (let [id,fAlbum] of Object.entries(fAllEpsMap)) {
        let aAlbum = new Archive.Album(
          id, 
          "Server name not given", 
          fAlbum.name, 
          fAlbum.coverart_url
        )
        // console.log(fAlbum, aAlbum)
        aAlbum.trackIds = [...fAlbum.tracks_ids]
        this.catalog.addEp(aAlbum)
      }
      this.allEps = this.catalog.getAllEps()
    },
    async getAllTracks() {
      let fAllTracksMap = await this.$svsBackend.getAllTracks()
      for (let [id,fTrack] of Object.entries(fAllTracksMap)) {
        let aTrack = new Archive.Track(id, fTrack.name, fTrack.audiofile_url)
        this.catalog.addTrack(aTrack)
        // console.log(aTrack, this.catalog)
      }
      // console.log("get all eps", fAllTracksMap)
    },
    onAlbumClick(evt) {
      this.activeAlbum = evt
      this.activeAlbumTracks = this.activeAlbum.trackIds.map(
        id => this.catalog.getTrackById(id)
      )
      console.log(this.activeAlbum, this.activeAlbumTracks)
    },
    onTrackClick(evt) {
      console.log(this.$svsAudioPlayer, this.audioPlayer)
      let track = new AudioPlayerLogic.Track(evt.id, evt.title, this.activeAlbum.name, 'https://' + evt.trackUrl)
      if (this.audioPlayer.pushAsNextTrack(track))
        this.audioPlayer.next()
      // this.audioPlayer
      //   .setTrack()
    }
  }

}
</script>

<style scoped lang='scss'>
// .ep-block {
//   .cover-art {
//     border-radius: 3px;
//     background: #333366;
//     box-shadow: 1px 2px 5px 0px #0004;
//   }
//   .ep-infos {
//     font-family: 'Jost';
//     padding: 5px;
//     .ep-name {
//       font-weight: 500;
//     }
//     .ep-server-name {
//       font-weight: 200;
//     }
//   }
// }
</style>
