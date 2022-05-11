<template>
  <section class="track-content">
    <track-layout>
      <template v-slot:topLeftLeft>
        <squared-image-box style="max-width: 100%;">
          <img
            :src="coverArtUrl"
            class="cover-art shadow-depth-1"
            @error="onCAUError"
          >
        </squared-image-box>
      </template>
      
      <template v-slot:topLeftRight>
        <div class="album-infos">
          <div
            v-if="showDevInfos"
            class="track-id"
          >
            {{ id }}
          </div>
          <div class="album-name">
            {{ title }}
          </div>
          <div class="">
            <em>in</em> 
            <router-link 
              :to="albumUrl"
            >
              {{ albumTitle }}
            </router-link>
          </div>
          <div class="album-server-name">
            <em>by</em> {{ authorName }}
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
      </template>

      <template v-slot:bottomLeft>
        <h3>Credits</h3>
        <table class="table is-hoverable is-striped is-fullwidth is-transparent">
          <tr
            v-for="(c, idx) of credits"
            :key="idx"
          >
            <td>{{ c.artistName }}</td>
            <td><em>{{ c.roles.join(', ') }}</em></td>
          </tr>
        </table>
      </template>

      <template v-slot:right>
        <h3>Lyrics</h3>
        <div
          v-if="lyrics"
          class="lyrics shadow-depth-1"
        >
          {{ lyrics }}
        </div>
        <div
          v-if="!lyrics"
          class="lyrics shadow-depth-1"
        >
          <em>This track is instrumental</em>
        </div>
      </template>
    </track-layout>
  </section>
</template>

<script>
import * as Archive from "../models"
import { RouterHelperMixin } from "../mixins"
import OneOneTwoXOneOneStackLayout from "@/modules/layouts/components/OneOneTwoXOneOneStackLayout.vue"

export default {
  components: {
    'track-layout': OneOneTwoXOneOneStackLayout
  },
  mixins: [
    RouterHelperMixin
  ],
  props: {
    author: {
      type: Archive.Server,
      required: false,
      default: null
    },
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
    },

    credits: {
      type: Array,
      required: false,
      default: () => []
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
    /**
     * @returns {string}
     */
    albumUrl() {
      return this.albumRoute(this.album)
    },
    id() {
      return this.track.id
    },
    title() {
      return this.track.title
    },
    authorName() {
      if (!this.author) return "..."
      return this.author.name
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

.table.is-transparent {
  background: transparent;
  color: inherit;
  tr:hover {
    background: #33336680;
  }
}
</style>