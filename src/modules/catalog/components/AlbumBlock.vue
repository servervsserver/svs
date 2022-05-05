<template>
  <div class="album-block">
    <div class="album-block-content">
      <squared-image-box class="image-box">
        <img
          :src="coverArtUrl"
          class="cover-art clickable"
          onerror="if (this.src != '/placeholders/uwu_colored_svs_transparent.png') this.src = '/placeholders/uwu_colored_svs_transparent.png';"
          @click="onCoverArtClick"
        >
      </squared-image-box>
      <div class="album-infos">
        <div class="album-name">
          {{ albumName }}
        </div>
        <div class="album-server-name">
          {{ albumServerName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Album } from "@/modules/catalog/models"

export default {
  props: {
    album: {
      type: Album,
      required: true
    }
  },
  computed: {
    coverArtUrl() {
      if (!this.album.coverArtUrl) 
        return '/placeholders/uwu_colored_svs_transparent.png'
      if (!/^http(s)?:\/\//.test(this.album.coverArtUrl)) 
        return "https://" + this.album.coverArtUrl
      return this.album.coverArtUrl
    },
    albumName() {
      return this.album.title
    },
    albumServerName() {
      return this.album.author
    }
  },
  emits: [
    'album-click'
  ],
  methods: {
    onCoverArtClick(evt) {
      this.$emit('album-click', this.album)
    }
  }
}
</script>


<style scoped lang='scss'>
.album-block {
  // .cover-art {
  //   border-radius: 3px;
  //   background: #333366;
  //   box-shadow: 1px 2px 5px 0px #0004;
  //   width: 100%;
  // }
  .image-box {
    width: 200px;
    @media (max-width:768px) {
     width: 35vw; 
    }
  }
  .album-infos {
    font-family: 'Jost';
    padding: 5px;
    .album-name {
      font-weight: 500;
    }
    .album-server-name {
      font-weight: 200;
    }
  }
}
</style>