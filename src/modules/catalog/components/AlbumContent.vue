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
        <img
          :src="coverArtUrl"
          class="cover-art"
          onerror="if (this.src != '/placeholders/uwu_colored_svs_transparent.png') this.src = '/placeholders/uwu_colored_svs_transparent.png';"
        >
      </div>
      <div class="column is-6">
        <ul class="track-list">
          <li 
            v-for="(track, index) in tracks"
            :key="index"
            class="track-list-item clickable"
            @click="onTrackClick(track)">
            <div class="track-number">
              {{ index + 1}}
            </div>
            <div class="track-title">
              {{ track.title }}
            </div>
            <div class="track-duration">
            </div>
          </li>
          <li 
            v-for="(track, index) in tracks"
            :key="index"
            class="track-list-item"
            @click="onTrackClick(track)">
            <div class="track-number">
              {{ index + 1}}
            </div>
            <div class="track-title">
              {{ track.title }}
            </div>
            <div class="track-duration">
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import { Album } from "@/modules/catalog/models"
import { Track } from "@/modules/catalog/models"

export default {
  props: {
    album: {
      type: Album,
      required: true
    },
    tracks: {
      type: Array,
      default: () => []
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
      background-color: orange;
      margin: 4px 0px;
      border-radius: 3px;

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