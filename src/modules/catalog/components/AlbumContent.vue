<template>
  <div class="album-content">
    <div class="columns is-mobile is-multiline">
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
            {{ albumName }}
          </div>
          <div class="album-server-name">
            <em>by</em> {{ albumServerName }}
          </div>
          <br>
          <div class="album-geners tags">
            <span
              v-for="genre in albumGenres"
              :key="genre"
              class="tag"
            >{{ genre }}</span>
          </div>
          <div class="meta-informations" v-if="isAdmin">
            <div class="meta-info-piece" v-for="(data, idx) of additionalDatas" :key="data">
              <a :href="data">{{ idx }}</a>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-6-desktop is-12-tablet is-12-mobile">
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
          >
            <div class="track-number">
              {{ index + 1 }}
            </div>
            <div class="track-title">
              <router-link :to="trackUrl(track)">{{ track.title }}</router-link>
            </div>
            <div class="album-geners tags">
              <span
                v-for="(genre, gidx) in track.genres" 
                :key="index + '-' + gidx + '-' + genre" 
                class="tag is-small"
              >
                {{ genre }}
              </span>
            </div>
            <!-- <div class="track-duration" /> -->
          </li>
          <li
            v-for="midx in mockTracksCount"
            :key="'mocktrack-' + midx"
            class="track-list-item shadow-depth-1 mock"
          >
            <div class="track-number">
              {{ midx }}
            </div>
            <div class="track-title">
              Loading track...
            </div>
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
    mockTracksCount: {
      type: Number,
      default: 4
    },
    loadingTracks: {
      type: Boolean,
      default: false
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
    baseRoute() {
      let l = this.$route.matched.length
      return this.$route.matched[l - 2].path
    },
    isAdmin() {
      return this.$svsAuth.isAdmin
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
    albumName() {
      return this.album.title
    },
    albumServerName() {
      // return this.album.title
      return this.album.author
    },
    albumGenres() {
      if (!this.tracks) return []

      let genres = new Set()
      for( let track of this.tracks) {
        for (let g of track.genres) {
          genres.add(g)
        }
      }
      return [...genres]
    },
    additionalDatas() {
      return this.album.additionalDatas
    }
  },
  methods: {
    /**
     * @returns {string}
     */
    trackUrl(track) {
      return [this.baseRoute, 'track', track.id ].join('/')
    },
    onTrackClick(evt) {
      this.$emit('track-click', evt)
    },
    onCAUError(evt) {
      this.failedOnceCAU = true
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

  .meta-informations {
    font-size: 0.8em;
  }
}

a {
  text-decoration: none;
}

em {
  font-size: 0.8em;
  font-weight: 200;  
}

</style>