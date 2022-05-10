<template>
  <section class="track-content">
    <h2>Track {{ title }}</h2>
    <div class="columns is-multiline is-mobile">
      
      <div class="column is-3 is-hidden-touch">
        <squared-image-box style="max-width: 300px">
          <img
            :src="coverArtUrl"
            class="cover-art shadow-depth-1"
            @error="onCAUError"
          >
        </squared-image-box>
      </div>

      <div class="column is-6-mobile is-hidden-desktop">
        <squared-image-box style="max-width: 30vw;">
          <img
            :src="coverArtUrl"
            class="cover-art shadow-depth-1"
          >
        </squared-image-box>
      </div>

      <div class="column is-3-desktop is-6-tablet">
        <div class="album-infos">
          <div class="album-name">
            {{ title }}
          </div>
          <div class="">
            <em>in</em> 
            <router-link 
              :to="albumUrl">
              {{ albumTitle }}
            </router-link>
          </div>
          <div class="album-server-name">
            <em>by</em> {{ author }}
          </div>
          <br>
          <div class="album-geners tags">
            <span
              v-for="genre in genres"
              :key="genre"
              class="tag"
            >{{ genre }}</span>
          </div>
        </div>
      </div>

      <div class="column is-6-desktop is-12-mobile" v-if="lyrics">
        <h3>Lyrics</h3>
        <div class="lyrics shadow-depth-1">{{ lyrics }}</div>
      </div>
    </div>
  </section>
</template>

<script>
import * as Archive from "../models"
import { RouterHelperMixin } from "../mixins"

export default {
  mixins: [
    RouterHelperMixin
  ],
  props: {
    /**
     * @type {Archive.Track} track to display
     */
    track: {
      type: Archive.Track,
      required: true
    },
    /**
     * @type {Archive.Album} Album the track belongs to
     */
    album: {
      type: Archive.Album,
      required: true
    }
  },
  data() {
    return {
      failedOnceCAU: false
    }
  },
  computed: {
    /**
     * @returns {string}
     */
    albumUrl() {
      return this.albumRoute(this.album)
    },
    title() {
      return this.track.title
    },
    author() {
      return this.album.author
    },
    albumTitle() {
      return this.album.title
    },
    albumId() {
      return this.album.id
    },
    genres() {
      return this.track.genres
    },
    coverArtUrl() {
      if (!this.album.coverArtUrl) 
        return '/placeholders/uwu_colored_svs_transparent.png'

      let uri = this.album.coverArtUrl

      if (this.failedOnceCAU)
        return uri

      uri = uri.replace('cover_arts', '500')
      return uri
    },
    lyrics() {
      return this.track.lyrics
    }
  },
  methods: {
    onCAUError(evt) {
      this.failedOnceCAU = true
    }
  }
}
</script>

<style scoped lang="scss">
.lyrics {
  background: #333366;
  color: inherit;
  white-space: pre-wrap;
  padding: 1em;
  max-height: 60vh;
  overflow: auto;
}

em {
  font-size: 0.8em;
  font-weight: 200;  
}
</style>