<template>
  <div>
    <div v-if="!hasAlbums">
      No albums.
    </div>
    <div 
      v-if="hasAlbums"
      class="album-collection 
      columns 
      is-mobile 
      is-variable is-1-mobile is-2-tablet is-3-desktop"
      :class="{ 'is-multiline': isMultiline, 'is-horizontal': isHorizontal  }"
    >
      <div 
        v-for="album of albums"
        :key="album.id"
        class="column is-narrow"
      >
        <album-block
          :server="getServerOfAlbum(album)"
          :album="album" 
          @album-click="onAlbumClick"
        />
      </div>
      <div
        v-for="mai in mockAlbumsCount"
        :key="mai"
        class="column"
      >
        <mock-album-block />
      </div>
    </div>
  </div>
</template>

<script>
import { Album } from "@/modules/catalog/models"
import AlbumBlockComponent from '@/modules/catalog/components/AlbumBlock.vue'
import MockAlbumBlockComponent from '@/modules/catalog/components/MockAlbumBlock.vue'

export default {
  components: {
    'album-block': AlbumBlockComponent,
    'mock-album-block': MockAlbumBlockComponent
  },
  props: {
    albums: {
      type: Array,
      required: true
    },
    servers: {
      type: Array,
      required: false
    },
    mockAlbumsCount: {
      type: Number,
      default: 0,
      required: false
    },
    layout: {
      type: String,
      required: false,
      default: 'grid',
      validator(value) {
        return ['grid', 'horizontal'].includes(value)
      }
    }
  },
  computed: {
    isMultiline() {
      return this.layout === 'grid'
    },
    isHorizontal() {
      return this.layout === 'horizontal'
    },
    serverMap() {
      if (!this.servers) return null

      let map = new Map()
      for(let server of this.servers) {
        map.set(server.id, server)
      }
      return map
    },
    hasAlbums() {
      return (this.albums && this.albums.length) || this.mockAlbumsCount
    }
  },
  methods: {
    getServerOfAlbum(album)  {
      if (!this.serverMap) return null
      return this.serverMap.get(album.author)
    },
    onAlbumClick(evt) {
      this.$emit('album-click', evt)
    }
  }
}
</script>

<style scoped lang="scss">
.is-horizontal {
  overflow: auto;
  mask: linear-gradient(90deg, #0000 0%, #000F 3%, #000F 97%, #0000);
}
.album-collection {
  position: relative;
}
</style>