<template>
  <div class="album-block">
    <div class="album-block-content has-text-centered">
      <squared-image-box class="image-box">
        <img
          :src="coverArtUrl"
          class="cover-art clickable"
          @error="onCAUError"
          @click="onCoverArtClick"
        >
      </squared-image-box>
      <div class="album-infos">
        <div class="album-server-id" v-if="showDevInfos">
          {{ albumId }}
        </div>
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

import { Album, Server } from "../models"
import { RouterHelperMixin } from "../mixins"

export default {
  mixins: [
    RouterHelperMixin
  ],
  props: {
    album: {
      type: Album,
      required: true
    },
    server: {
      type: Server,
      required: false
    }
  },
  data() {
    return {
      failedOnceCAU: false
    }
  },
  computed: {
    showDevInfos() {
      return this.$svsSettings.showDevInfos
    },
    coverArtUrl() {
      if (!this.album.coverArtUrl) 
        return '/placeholders/uwu_colored_svs_transparent.png'

      let uri = this.album.coverArtUrl

      if (this.failedOnceCAU)
        return uri

      uri = uri.replace('cover_arts', '250')
      return uri
    },
    albumName() {
      return this.album.title
    },
    albumId() {
      return this.album.id
    },
    albumServerName() {
      if (!this.server) {
        console.warn("No server provided, cannot display info")
        return '...'
      }
      return this.server.name
      // return this.album.author
    }
  },
  emits: [
    'album-click'
  ],
  methods: {
    onCoverArtClick(evt) {
      this.$emit('album-click', this.album)
    },
    onCAUError(evt) {
      this.failedOnceCAU = true
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
  max-width:  200px;
  .album-block-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .image-box {
    width: 200px;
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

    .album-server-id {
      font-weight: 100;
      font-size: 0.8em;
    }
  }

  @media (max-width:768px) {
    max-width: calc((100vw - 16px - 1em) / 3);
    .image-box {
      width: calc((100vw - 16px - 1em) / 3);
    }

    .album-infos {
      font-size: 0.8rem;
    }
  }
}
</style>