<template>
  <div>
    <div v-if="!hasAlbums">
      No albums.
    </div>
    <div 
      v-if="hasAlbums"
      class="album-collection columns is-multiline is-mobile is-variable is-1-mobile is-1-tablet"
    >
      <div 
        v-for="album of albums"
        :key="album.id"
        class="column"
      >
        <album-block 
          :album="album" 
          @album-click="onAlbumClick"
        />
      </div>
      <div v-for="mai in mockAlbumsCount" :key="mai"
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
    mockAlbumsCount: {
      type: Number,
      default: 0,
      required: false
    }
  },
  computed: {
    hasAlbums() {
      return (this.albums && this.albums.length) || this.mockAlbumsCount
    }
  },
  methods: {
    onAlbumClick(evt) {
      this.$emit('album-click', evt)
    }
  }
}
</script>