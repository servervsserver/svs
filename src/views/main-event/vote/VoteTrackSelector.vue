<template>
  <div>
    <div class="columns is-mobile is-multiline is-vcentered is-gapless">
      <div class="column is-1 has-text-centered">
        {{ index }}
      </div>
      <div class="column is-12-touch is-5-desktop">
        <select-input 
          :value="selectedAlbumOption"
          :label="'Album'"
          :unselected-text="'Pick an album'"
          :options="albumOptions"
          @change="onChange($event)"
        />
      </div>
      <div class="column is-12-touch is-4-desktop">
        <select-input 
          :value="selectedTrackOption"
          :label="'Track'"
          :unselected-text="'Pick a track'"
          :options="trackOptions"
          @change="onTrackChange($event)"
        />
      </div>
      <div class="column is-1">
        <squared-image-box style="width: 50px">
          <img :src="artworkUrl">
        </squared-image-box>
      </div>
      <div class="column is-1">
        <div
          v-if="selectedTrack"
          class="button svs-button-transparent"
          @click="playSelectedTrack()"
        >
          <span class="icon"><i class="fa-solid fa-play" /></span>
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
import * as Archive from "../../../modules/catalog/models"
import * as Firestore from "../../../plugins/backend/firestore"
import * as Forms from "../../../modules/forms"

export default {
  components: {
    // 'text-input': Forms.TextInputComponent,
    // 'textarea-input': Forms.TextAreaInputComponent,
    'select-input': Forms.SelectInputComponent
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    vaue: {
      type: Archive.Album,
      default: null
    },
    index: {
      type: Number,
      default: 1
    },
    /**
     * @type {Archive.Server[]}
     */
    servers: {
      type: Array,
      default: () => [],
    },
    /**
     * @type {Archive.Album[]}
     */
    albums: {
      type: Array,
      default: () => [],
    },
    /**
     * @type {Map<string,Archive.Track>}
     */
    tracks: {
      type: Map,
      default: () => new Map()
    },
    /**
     * @type {Archive.AlbumCollection}
     */
    collection: {
      type: Archive.AlbumCollection,
      default: null,
    }
  },
  data() {
    return { 
      selectedAlbumOption: null,
      selectedTrackOption: null,
      selectedAlbum: null,
      selectedTrack: null,
      previousSelectedAlbum: null
    }
  },
  computed: {
    /**
     * @returns {Archive.AsyncCatalog}
     */
    catalog() {
      return this.$svsCatalog.mainCatalog
    },
    /**
     * @returns {string[]}
     */
    albumOptions() {
      /**
       * @type {Archive.Album[]}
       */
      let albums = this.albums || []
      /**
       * @type {Archive.Server[]}
       */
      let servers = this.servers || []

      let opts = []
      for (let album of albums) {
        let sId = album.author
        let server = servers.find(server => server.id === sId)
        let albumName = album.title
        let serverName = server.name
        if (albumName.length > 20) albumName = albumName.substring(0,17) + '...'
        if (serverName.length > 20) serverName = serverName.substring(0,17) + '...'
        let opt = `${albumName} - ${serverName}`
        opts.push(opt)
      }
      
      return opts
    },
    trackOptions() {
      if (!this.selectedAlbum) return []
      
      let opts = []
      for (let id of this.selectedAlbum.trackIds) {
        opts.push(this.tracks.get(id).title)
      }

      return opts
    },
    artworkUrl() {
      if (!this.selectedAlbum) return ''
      return this.selectedAlbum.coverArtUrl.replace('cover_arts', '250')
    }
  },
  methods: {
    computeNewSelectedAlbum() {
      /** @type {string[]} */
      let opts = this.albumOptions
      if (!opts) return null

      let idx = opts.indexOf(this.selectedAlbumOption)
      if (idx < 0) return null

      let album = this.albums[idx]
      // if (this.previousSelectedAlbum !== album)
      //   this.onChange(album)

      // this.previousSelectedAlbum = album
      return album
    },
    computeNewSelectedTrack() {
      let opts = this.trackOptions
      if (!opts) return null

      let idx = opts.indexOf(this.selectedTrackOption)
      if (idx < 0) return null
      
      let track = this.tracks.get(this.selectedAlbum.trackIds[idx])

      return track
    },
    onChange(event) {
      this.selectedAlbumOption = event
      let album = this.computeNewSelectedAlbum()
      this.selectedAlbum = album
      this.selectedTrackOption = null
      this.selectedTrack = null
    },
    onTrackChange(event) {
      this.selectedTrackOption = event
      let track = this.computeNewSelectedTrack()
      this.selectedTrack = track
      this.$emit('change', this.selectedTrack)
    },
    playSelectedTrack() {
      if (this.selectedTrack)
        this.$svsCatalog.playTrack(this.selectedTrack)
    }
  }
}
</script>

<style lang="scss" scoped>
.award-vote {
  padding: 10px;
  margin: 10px 0;
}
</style>