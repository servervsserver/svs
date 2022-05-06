<template>
  <coming-soon :type="'page'">
    <div>
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
          :loading-tracks="loadingTracks"
          @track-click="onTrackClick" 
        />
        <div
          v-if="activeAlbumTracks && activeAlbumTracks.length"
          class="buttons is-justify-content-flex-end"
        >
          <button
            class="button svs-button-transparent"
            @click="sendEpToQueue"
          >
            <span>
              <span style="font-size: 0.6em;">Send EP to queue</span>
              <br>
              <span>
                <i class="fa-solid fa-compact-disc" />&nbsp;
                <i class="fa-solid fa-angle-right" />&nbsp;
                <i class="fa-solid fa-list-ol" />
              </span>
            </span>
          </button>
          <button
            class="button svs-button-transparent"
            @click="sendEpToQueueAndPlayEp"
          >
            <span>
              <span style="font-size: 0.6em;">Play EP</span>
              <br>
              <span>
                <i class="fa-solid fa-compact-disc" />&nbsp;
                <i class="fa-regular fa-circle-play" />
              </span>
            </span>
          </button>
        </div>
      </section>
      <blockquote
        v-if="loadingAlbums"
        class="has-text-centered"
        style="font-size: 2em;"
      >
        <spinner />
        Loading the EPs... 
        <spinner />
      </blockquote>
      <section>
        <div class="buttons">
          <button
            class="button"
            @click="sortAlbumsByServername(!ascending)"
          >
            Sort by Server
          </button>
          <button
            class="button"
            @click="sortAlbumsByTitle(!ascending)"
          >
            Sort by Title
          </button>
          <button
            class="button"
            @click="shuffleAlbums"
          >
            Shuffle
          </button>
        </div>
        <albums-list 
          :albums="albums"
          :mockAlbumsCount="mockAlbumsCount"
          @album-click="onAlbumClick"
        />
      </section>
    </div>
  </coming-soon>
</template>

<script>
import AlbumListComponent from "@/modules/catalog/components/AlbumsList.vue"
import AlbumContentComponent from "@/modules/catalog/components/AlbumContent.vue"
import ComingSoon from '../../components/ComingSoon.vue'
import * as Archive from "@/modules/catalog/models"
import * as AudioPlayerLogic from "@/modules/audio-player/models"
import Spinner from "@/components/Spinner.vue";

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

export default {
  components: {
    'albums-list': AlbumListComponent,
    'album-content': AlbumContentComponent,
    ComingSoon,
    'spinner': Spinner,
  },
  data () {
    return {
      servers: null,
      catalog: null,
      albums: [],
      mockAlbumsCount: 20,
      activeAlbum: null,
      activeAlbumTracks: [],
      loadingTracks: false,
      ascending: false,
      loadingAlbums: false
    }
  },
  computed: {
    audioPlayer() {
      return this.$svsAudioPlayer.mainAudioPlayer
    }
  },
  async mounted() {
    this.loadingAlbums = true
    this.catalog = new Archive.Catalog()
    this.mockAlbumsCount = 20
    let aAndS = this.restoreAlbumsAndServers()
    if (!aAndS || !this.lastCache() || (Date.now() - this.lastCache() > 1000 * 60 * 60)) {
      aAndS = await this.$svsBackend.getAlbumsAndServersOfEvent('svs_iv')
    }
    this.storeAlbumsAndServers(aAndS.albums, aAndS.servers)

    let servers = aAndS.servers
    this.servers = servers

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
    this.mockAlbumsCount = 0
    this.shuffleAlbums()
    this.loadingAlbums = false
  },
  methods: {
    storeAlbumsAndServers(albums, servers) {
      localStorage.setItem("svsivradio/albums", JSON.stringify(albums))
      localStorage.setItem("svsivradio/servers", JSON.stringify(servers))
      localStorage.setItem("svsivradio/cachedAt", JSON.stringify(Date.now()))
    },
    lastCache() {
      return JSON.parse(localStorage.getItem("svsivradio/cachedAt"))
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
    shuffleAlbums() {
      this.albums = [...shuffle(this.albums)]
    },
    sortAlbumsByTitle(ascending) {
      this.albums.sort((a, b) => {
        return ("" + a.title).localeCompare(b.title)
      })
      if (!ascending)
        this.albums.reverse()
      this.ascending = ascending
    },
    sortAlbumsByServername(ascending) {
      this.albums.sort((a, b) => {
        return (""+a.author).localeCompare(b.author)
      })
      if (!ascending)
        this.albums.reverse()
      this.ascending = ascending
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
          if (fTrack.genres)
            aTrack.genres = [...fTrack.genres]
          this.catalog.addTrack(aTrack)
        }
        console.log(aTrack)
        tracks.push(aTrack)
      }
      console.log(this.activeAlbumTracks)
      this.loadingTracks = false
      this.activeAlbumTracks = tracks
    },
    onTrackClick(evt) {
      console.log(this.$svsAudioPlayer, this.audioPlayer)
      let track = new AudioPlayerLogic.Track(evt.id, evt.title, this.activeAlbum.name, evt.trackUrl)
      if (this.audioPlayer.pushAsNextTrack(track))
        this.audioPlayer.next()
      else {
        console.log(this.audioPlayer.moveToTrack(track))
      }

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
      this.audioPlayer.play()
      console.log("HEYA")
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
  margin-bottom: 20px;
  overflow: hidden scroll;
}

</style>