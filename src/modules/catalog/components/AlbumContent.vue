<template>
  <section class="album-content">
    <h2>{{ albumName }}</h2>
    <layout>
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
          <div
            v-if="isAdmin"
            class="meta-informations"
          >
            <div
              v-for="(data, idx) of additionalDatas" 
              :key="data + '-' + idx" 
              class="meta-info-piece"
            >
              <a :href="data">{{ idx }}</a>
            </div>
          </div>
        </div>
      </template>

      <template v-slot:right>
        <div class="tracks-top-additional-buttons">
          <div class="buttons">
            <slot
              name="tracksTopButtons"
              :tracks="tracks"
            />
          </div>
        </div>

        <ul class="track-list">
          <track-list-item 
            v-for="(track, index) in innerTracks" 
            :key="index"
            :index="index"
            :track="track"
          >
            <template v-slot:trackButtons="slotProps">
              <slot
                name="trackButtons"
                :track="slotProps.track"
              />
            </template>
          </track-list-item>
        </ul>
      </template>
    </layout>
  </section>
</template>

<script>
import TrackListItemComponent from "./TrackListItem.vue"
import OneOneTwoXOneOneStackLayout from "@/modules/layouts/components/OneOneTwoXOneOneStackLayout.vue"

import { Album, Track, Server } from "@/modules/catalog/models"
import { RouterHelperMixin } from "../mixins"

export default {  
  components: {
    'track-list-item': TrackListItemComponent,
    'layout': OneOneTwoXOneOneStackLayout
  },
  mixins: [
    RouterHelperMixin
  ],
  props: {
    server: {
      type: Server,
      required: true
    },
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
    }
  },
  data() {
    return {
      failedOnceCAU: false
    }
  },
  computed: {
    innerTracks() {
      let tracks = []
      if (this.tracks) tracks = [...this.tracks]
      for(let i = 0; i < this.mockTracksCount; i++) {
        tracks.push(null)
      }
      return tracks
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
      return this.server.name
    },
    serverUrl() {
      return [this.baseRoute, 'server', this.server.id ].join('/')
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
  }

  .meta-informations {
    font-size: 0.8em;
  }
}

.tracks-top-additional-buttons {
  // display: flex;
  padding: 1em;
  .buttons {
    display: flex;
    flex-direction: row-reverse;
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