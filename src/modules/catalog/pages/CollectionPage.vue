<template>
  <section>
    <div v-if="collection">
      <album-collection
        :collection="collection"
        :servers="servers"
        :albums="albums"
        @album-click="onAlbumClick"
      />
    </div>
    <div
      v-if="showDevInfos"
      class="buttons"
    >
      <button
        class="button"
        @click="clearCache()"
      >
        Clear cache
      </button>
      <button
        class="button"
        @click="deleteCache()"
      >
        Delete cache
      </button>
    </div>
    <!-- <albums-list
      :servers="servers"
      :albums="albums"
      :mock-albums-count="mockAlbumsCount"
      @album-click="onAlbumClick"
    /> -->
  </section>
</template>

<script>
// import AlbumListComponent from "../components/AlbumsList.vue"
import AlbumCollectionContentComponent from "../components/AlbumCollectionContent.vue"
import * as Archive from "../models"
import { RouterHelperMixin } from "../mixins"

export default {
  components: {
    'album-collection': AlbumCollectionContentComponent
  },
  mixins: [
    RouterHelperMixin
  ],
  data() {
    return {
      collection: null,
      /**
       * @type {Archive.Album[]}
       */
      albums: [],
      /**
       * @type {Server.Server[]}
       */
      servers: []
    }
  },
  computed: {
    showDevInfos() {
      return this.$svsSettings.showDevInfos
    },
    /**
     * @returns {Archive.AsyncCatalog}
     */
    catalog() {
      return this.$svsCatalog.mainCatalog
    },
  },
  async mounted() {
    let id = this.$route.params.id

    let collection = await this.catalog.asyncGetAlbumCollectionById('svs-iv')
    this.collection = collection
    
    let albumsIds = collection.albumsIds

    this.albums = []
    for (let albumId of collection.albumsIds) {
      let album = await this.catalog.asyncGetAlbumById(albumId)
      let serverId = album.author
      let server = await this.catalog.asyncGetServerById(serverId)
      
      this.servers.push(server)
      this.albums.push(album)
    }

  },
  methods: {
    onAlbumClick(album) {
      this.navigateToAlbum(album)
    },
    mockAlbumsCount(expectedCount, actualCount) {
      return Math.max(0, expectedCount - actualCount)
    },
    async clearCache() {
      this.catalog.asyncClearCache()
    },
    async deleteCache() {
      this.catalog.asyncDeleteCache()
    }
  }
}
</script>

<style lang="sass" scoped>

</style>