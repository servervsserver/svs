<template>
  <section>
    <div v-if="collection">
      <h2>{{ collection.name }}</h2>
      <p>
        {{collection.description }}
      </p>
      <album-collection
        :collection="collection"
        :servers="servers"
        :albums="albums"
        @album-click="onAlbumClick"
      />
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

export default {
  components: {
    // 'albums-list': AlbumListComponent,
    'album-collection': AlbumCollectionContentComponent
  },
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
  computed: {
    /**
     * @returns {string}
     */
    baseRoute() {
      let l = this.$route.matched.length
      return this.$route.matched[l - 2].path
    },
    /**
     * @returns {Archive.AsyncCatalog}
     */
    catalog() {
      return this.$svsCatalog.mainCatalog
    },
  },
  methods: {
    onAlbumClick(album) {
      console.log(album)
      this.$router.push([this.baseRoute, 'album', album.id].join('/'))
    },
    mockAlbumsCount(expectedCount, actualCount) {
      return Math.max(0, expectedCount - actualCount)
    }
  }
}
</script>

<style lang="sass" scoped>

</style>