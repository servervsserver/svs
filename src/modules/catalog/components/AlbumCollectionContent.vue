<template>
<section>
  <h2>{{ collection.name }}</h2>
  <p>
    {{collection.description }}
  </p>
  <div class="buttons">
    <button class="button svs-button-transparent" @click="cycleLayouts()">
      <span class="icon">
        <i class="fa-solid fa-ellipsis" v-if="layout == 'horizontal'"></i>
        <i class="fa-solid fa-ellipsis-vertical" v-if="layout == 'vertical'"></i>
        <i class="fa-solid fa-grip" v-if="layout == 'grid'"></i>
      </span>
      <span v-if="layout == 'horizontal'">Line layout</span>
      <span v-if="layout == 'grid'">Grid layout</span>
    </button>
  </div>
  <albums-list
    :servers="servers"
    :albums="mainCollectionAlbums"
    :mockAlbumsCount="mainCollectionMockCount"
    :layout="layout"
    @album-click="onAlbumClick"
  />
  <section v-for="(sc, scidx) in collection.subCollections" :key="'subcol-' + scidx">
    <h3>{{ sc.name }}</h3>
    <p>{{sc.description}}</p>
    <albums-list
      :servers="servers"
      :albums="albumsOfCollection(sc)"
      :mockAlbumsCount="mockAlbumsCountOfCollection(sc)"
      :layout="layout"
      @album-click="onAlbumClick"
    />
  </section>
</section>
</template>

<script>
import AlbumListComponent from "./AlbumsList.vue"
import * as Archive from "../models"
import { RouterHelperMixin } from "../mixins"

export default {
  mixins: [
    RouterHelperMixin
  ],
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
      layout: 'horizontal',
      layouts: ['horizontal', 'grid']
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
      return this.albumsFromIds(this.collection.albumsIds)
    },
    mainCollectionMockCount() {
      return this.mockAlbumsCount(this.collection.albumsIds.length, this.mainCollectionAlbums.length)
    }
  },
  methods: {
    cycleLayouts() {
      let idx = this.layouts.indexOf(this.layout)
      this.layout = this.layouts[(idx + 1) % this.layouts.length]
    },
    albumsFromIds(ids) {
      let albums = []
      let map = this.albumMap
      for (let id of ids) {
        let album = this.albumMap.get(id)
        if (!album) continue
        albums.push(album)
      }
      return albums
    },
    onAlbumClick(album) {
      this.$emit('album-click', album)
      // this.$router.push([this.baseRoute, 'album', album.id].join('/'))
    },
    mockAlbumsCount(expectedCount, actualCount) {
      return Math.max(0, expectedCount - actualCount)
    },
    albumsOfCollection(collection) {
      return this.albumsFromIds(collection.albumsIds)
    },
    mockAlbumsCountOfCollection(collection) {
      let albums = this.albumsOfCollection(collection)
      return this.mockAlbumsCount(collection.albumsIds.length, albums.length)
    }
  }
}
</script>