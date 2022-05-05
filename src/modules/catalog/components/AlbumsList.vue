<template>
  <div>
    <div v-if="!hasAlbums">
      No albums.
    </div>
    <div 
      v-if="hasAlbums"
      class="album-collection columns is-multiline is-mobile"
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
    </div>
  </div>
</template>

<script>
import { Album } from "@/modules/catalog/models"
import AlbumBlockComponent from '@/modules/catalog/components/AlbumBlock.vue'

export default {
  components: {
    'album-block': AlbumBlockComponent
  },
  props: {
    albums: {
      type: Array,
      required: true
    }
  },
  computed: {
    hasAlbums() {
      return this.albums && this.albums.length
    }
  },
  methods: {
    onAlbumClick(evt) {
      this.$emit('album-click', evt)
    }
  }
}
</script>