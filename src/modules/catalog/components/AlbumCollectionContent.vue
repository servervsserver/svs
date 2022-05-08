<template>
<section>
  <albums-list
    :servers="servers"
    :albums="mainCollectionAlbums"
    :mockAlbumsCount=""
    @album-click="onAlbumClick"
  />
</section>
</template>

<script>
import AlbumListComponent from "./AlbumsList.vue"
import * as Archive from "../models"

export default {
  components: {
    'albums-list': AlbumListComponent,
  },
  props: {
    collection:  {
      type: Archive.AlbumCollection,
      required: true
    },
    servers: {
      type: Array,
      required: true
    },
    albums: {
      type: Array,
      required: true
    },
    // mockAlbumsCount: {
    //   type: Number,
    //   required: false,
    //   default: 10
    // }
  },
  data() {
    return {

    }
  },
  computed: {
    albumMap() {
      let map = new Map()
      this.albums.forEach((album) => {
        map.set(album.id, album)
      })
      return map
    },
    mainCollectionAlbums() {
      let albums = []
      let map = this.albumMap
      for (let id of this.collection.albumsIds) {
        let album = this.albumMap.get(id)
        if (!album) continue
        albums.push(album)
      }
      return albums
    },
    mainCollectionMockCount() {
      this.mockAlbumsCount(this.collection.albumsIds.length, this.mainCollectionAlbums.length)
    }
  },
  methods: {
    onAlbumClick(album) {
      this.$emit('album-click', album)
      // this.$router.push([this.baseRoute, 'album', album.id].join('/'))
    },
    mockAlbumsCount(expectedCount, actualCount) {
      return Math.max(0, expectedCount - actualCount)
    }
  }
}
</script>