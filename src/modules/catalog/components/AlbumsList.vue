<template>
  <div>
    <div v-if="!albums">
      No albums.
    </div>
    <div 
      v-if="albums"
      class="album-collection columns is-multiline is-mobile"
    >
      <div 
        v-for="album of albums"
        :key="album.id"
        class="column is-2-desktop is-3-tablet is-6-mobile"
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
  methods: {
    onAlbumClick(evt) {
      this.$emit('album-click', evt)
    }
  }
}
</script>