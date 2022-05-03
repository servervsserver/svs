<template>
  <div class="album-content">
    <div class="columns">
      <div class="column is-3">
        <div class="album-infos">
          <div class="album-name">
            {{ albumName }}
          </div>
          <div class="album-server-name">
            {{ albumServerName }}
          </div>
        </div>
      </div>
      <div class="column is-3">
        <squared-image-box style="max-width: 200px">
          <img
            :src="coverArtUrl"
            class="cover-art shadow-depth-1"
            onerror="if (this.src != '/placeholders/uwu_colored_svs_transparent.png') this.src = '/placeholders/uwu_colored_svs_transparent.png';"
          >
        </squared-image-box>
      </div>
      <div class="column is-6">
        <div v-if="loadingTracks">
          <blockquote>
            Loading the tracks... 
            <spinner />
          </blockquote>
        </div>
        <ul class="track-list">
          <li 
            v-for="(track, index) in tracks"
            :key="index"
            class="track-list-item shadow-depth-1 clickable"
            @click="onTrackClick(track)"
          >
            <div class="track-number">
              {{ index + 1 }}
            </div>
            <div class="track-title">
              {{ track.title }}
            </div>
            <div class="track-duration" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import Spinner from "@/components/Spinner.vue";

import { Album } from "@/modules/catalog/models"
import { Track } from "@/modules/catalog/models"

export default {
  components: {
    'spinner': Spinner,
  },
  props: {
    album: {
      type: Album,
      required: true
    },
    tracks: {
      type: Array,
      default: () => []
    },
    loadingTracks: {
      type: Boolean,
      default: false
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
      return this.album.author
    }
  },
  methods: {
    onTrackClick(evt) {
      this.$emit('track-click', evt)
    }
  }
}
</script>

<style scoped lang='scss'>
.album-content {
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
  .track-list {
    list-style: none;
    margin: 0px;
    padding: 0px;
    .track-list-item {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      background: linear-gradient(58deg, black, #333366, #f5816b80, transparent);
      margin: 4px 0px;
      border-radius: 3px;
      // box-shadow: 1px solid #333366;

      & > * {
        padding: 1em;
      }
      .track-number {
        font-variant-numeric: tabular-nums;
        width: 4em;
        text-align: center;
      }
    }
  }
}

</style>