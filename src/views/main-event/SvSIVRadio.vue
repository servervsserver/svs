<template>
<coming-soon :type="'page'">
  <div>
    <!-- <drawer ref="sidenav">
      <template v-slot:content> -->
        <h1>SvS IV Radio</h1>
        <section class="album-content-section shadow-depth-2">
          <!-- <button class="button" @click="toggleDrawer">Close</button> -->
          <blockquote
            v-if="!activeAlbum"
          >
          Click on an EP to see its content!
          </blockquote>
          <album-content
            v-if="activeAlbum"
            :album="activeAlbum"
            :tracks="activeAlbumTracks"
            :loadingTracks="loadingTracks"
            @track-click="onTrackClick" 
          />
          <div class="buttons" v-if="activeAlbumTracks && activeAlbumTracks.length">
            <button class="button" @click="sendEpToQueue">Send EP to queue</button>
            <!-- <button class="button" @click="sendEpToQueueAndPlayEp">Play EP</button> -->
          </div>
        </section>
        <section>
          <albums-list 
            :albums="albums"
            @album-click="onAlbumClick"
          />
        </section>
      <!-- </template>
      <template v-slot:aside> -->
      <!-- </template>
    </drawer> -->
  </div>
</coming-soon>
</template>

<script>
import AlbumListComponent from "@/modules/catalog/components/AlbumsList.vue"
import AlbumContentComponent from "@/modules/catalog/components/AlbumContent.vue"
import ComingSoon from '../../components/ComingSoon.vue'
import * as Archive from "@/modules/catalog/models"
import * as AudioPlayerLogic from "@/modules/audio-player/models"

export default {
  components: {
    'albums-list': AlbumListComponent,
    'album-content': AlbumContentComponent,
    ComingSoon,
  },
  data () {
    return {
      servers: null,
      catalog: null,
      albums: [],
      activeAlbum: null,
      activeAlbumTracks: [],
      loadingTracks: false
    }
  },
  computed: {
    audioPlayer() {
      return this.$svsAudioPlayer.mainAudioPlayer
    }
  },
  async mounted() {
    
    this.catalog = new Archive.Catalog()
    
    let aAndS = this.restoreAlbumsAndServers()
    if (!aAndS) {
      aAndS = await this.$svsBackend.getAlbumsAndServersOfEvent('svs_iv')
    }
    this.storeAlbumsAndServers(aAndS.albums, aAndS.servers)
    this.servers = aAndS.servers

    let fAlbumsMap = aAndS.albums
    for (let [id, fAlbum] of Object.entries(fAlbumsMap)) {
      // console.log(this.servers[fAlbum.server_id], fAlbum)
      let aAlbum = new Archive.Album(
        id,
        this.servers[fAlbum.server_id].name,
        fAlbum.name,
        fAlbum.coverart_url
      )
      aAlbum.trackIds = [...fAlbum.tracks_ids]
      this.catalog.addAlbum(aAlbum)
    }

    this.albums = this.catalog.getAllAlbums()

  },
  methods: {
    storeAlbumsAndServers(albums, servers) {
      localStorage.setItem("svsivradio/albums", JSON.stringify(albums))
      localStorage.setItem("svsivradio/servers", JSON.stringify(servers))
    },
    restoreAlbumsAndServers() {
      let res = { 
        albums: JSON.parse(localStorage.getItem("svsivradio/albums")),
        servers: JSON.parse(localStorage.getItem("svsivradio/servers"))
      }
      if (!res.albums || !res.servers) 
        return null
      return res
    },
    async onAlbumClick(album) {
      this.activeAlbum = album
      this.activeAlbumTracks = []
      this.loadingTracks = true
      let tracks = []
      for (let trackId of this.activeAlbum.trackIds) {
        let aTrack = this.catalog.getTrackById(trackId)
        if (!aTrack) {
          let fTrack = await this.$svsBackend.getTrackById(trackId)
          aTrack = new Archive.Track(
            trackId, 
            fTrack.name,
            fTrack.audiofile_url
          )
          this.catalog.addTrack(aTrack)
        }
        console.log(aTrack)
        tracks.push(aTrack)
      }
      console.log(this.activeAlbumTracks)
      this.loadingTracks = false
      this.activeAlbumTracks = tracks
      // this.$refs.sidenav.open()
    },
    onTrackClick(evt) {
      console.log(this.$svsAudioPlayer, this.audioPlayer)
      let track = new AudioPlayerLogic.Track(evt.id, evt.title, this.activeAlbum.name, evt.trackUrl)
      if (this.audioPlayer.pushAsNextTrack(track))
        this.audioPlayer.next()
      this.audioPlayer.play()
    },
    sendEpToQueue() {
      for (let track of this.activeAlbumTracks) {
        let apTrack = new AudioPlayerLogic.Track(
          track.id, 
          track.title, 
          this.activeAlbum.name, 
          track.trackUrl
        )
        this.audioPlayer.pushToQueue(apTrack)
      }
    },
    sendEpToQueueAndPlayEp() {
      this.sendEpToQueue()
      let track = this.activeAlbumTracks[0]
      this.audioPlayer.moveToTrack(track)
    }
  }
}
</script>

<style scoped lang='scss'>
.album-content-section {
  // width: 90vw;
  // min-height: 20vh;
  max-height: 50vh;
  padding: 20px;
  margin-bottom: 40px;
}

</style>