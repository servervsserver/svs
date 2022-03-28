<template>
  <div class="album-block">
    <div class="album-block-content">
      <img
        :src="coverArtUrl"
        class="cover-art"
        onerror="if (this.src != '/placeholders/uwu_colored_svs_transparent.png') this.src = '/placeholders/uwu_colored_svs_transparent.png';"
      >
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
      // return this.album.title
      return "Server name not provided"
    }
  }
}
</script>


<style scoped lang='scss'>
.album-block {
  .cover-art {
    border-radius: 3px;
    background: #333366;
    box-shadow: 1px 2px 5px 0px #0004;
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