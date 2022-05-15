<template>
  <div>
    <div class="columns is-mobile is-multiline is-vcentered">
      <div class="column is-1 has-text-centered">
        {{ index }}
      </div>
      <div class="column is-12-touch is-10-desktop">
        <select-input 
          :value="selectedAlbumOption"
          :label="'Album'"
          :unselectedText="'Pick an album'"
          :options="albumOptions"
          @change="onChange($event)"
        />
      </div>
      <div class="column">
        <squared-image-box style="width: 60px">
          <img :src="artworkUrl" />
        </squared-image-box>
      </div>
    </div>
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
      selectedAlbum: null,
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
        let name = server.name
        if (name.length > 20) name = name.substring(0,17) + '...'
        let opt = `${album.title} - ${name}`
        opts.push(opt)
      }
      
      return opts
    },
    // selectedAlbum() {
    //   /** @type {string[]} */
    //   let opts = this.albumOptions
    //   if (!opts) return null

    //   let idx = opts.indexOf(this.selectedAlbumOption)
    //   if (idx < 0) return null

    //   let album = this.albums[idx]
    //   // if (this.previousSelectedAlbum !== album)
    //   //   this.onChange(album)

    //   // this.previousSelectedAlbum = album
    //   return album
    // },
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
    onChange(event) {
      this.selectedAlbumOption = event
      let album = this.computeNewSelectedAlbum()
      this.selectedAlbum = album
      this.$emit('change', this.selectedAlbum)
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