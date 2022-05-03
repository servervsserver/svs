<template>
  <section>
    <div
      v-if="album"
      class="album-infos-container"
    >
      <div class="album-infos columns">
        <div class="column is-5">
          <h3>Album infos</h3>
          <div class="album-title">
            {{ album.name }}
          </div>
          <div class="streamlink">
            <label>Stream link: </label>
            <a :href="album.streaming_link">{{ album.streaming_link || album.streaminglink }}</a>
          </div>
          <div class="track-list">
            <h3>Tracks</h3>
            <ol>
              <li 
                v-for="(track, idx) in tracks"
                :key="idx" 
                class="clickable"
                @click="selectTrack(track, idx)"
              >
                {{ track.name }}
              </li>
            </ol>
          </div>
        </div>
        <div class="column is-offset-2 is-5">
          <squared-image-box style="max-width: 200px">
            <img
              ref="serverIconEl"
              class="shadow-depth-2"
              :src="coverArtUrl"
            >
          </squared-image-box>
        </div>
      </div>
      <div class="selected-track-infos">
        <blockquote v-if="!selectedTrack">
          Click on a track to see its infos
        </blockquote>
        <div v-if="selectedTrack">
          <div><strong>Track title: </strong>{{ selectedTrack.name }}</div>
          <div><strong>Explicit: </strong>{{ selectedTrack.explicit ? 'yes' : 'no' }}</div>
          <div><strong>Genres: </strong>{{ selectedTrack.genres.join(', ') }}</div>
          <div><strong>Track title: </strong>{{ selectedTrack.name }}</div>
          <audio
            controls
            :src="selectedTrackAudioUrl"
          />
          <button
            v-if="selectedTrack.lyrics"
            class="button"
            @click="openLyricsModal"
          >
            Show lyrics
          </button>
          <div
            v-if="selectedTrackCredits"
            class="selected-track-credits"
          >
            <div
              v-for="(c, cidx) in selectedTrackCredits" 
              :key="cidx" 
              class="columns"
            >
              <div class="column is-3">
                {{ c.artist_name }}
              </div>
              <div class="column is-3">
                {{ c.discord_tag }}
              </div>
              <div class="column is-3">
                {{ c.roles.join(', ') }}
              </div>
              <div class="column is-3">
                {{ c.anonymous ? "Anonymous": '' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal ref="lyrics">
      <template v-slot:header>
        Lyrics
      </template>
      <template v-slot:default>
        <pre v-if="selectedTrack">{{ selectedTrack.lyrics }}</pre>
      </template>>
    </modal>
  </section>
</template>

<script>
import ModalComponent from "@/components/Modal.vue";

function addHttps(url) {
  if (!url) {
    return ""
  }
  if (!/^http/.test(url)) {
    url = 'https://' + url
  }
  return url
}

export default {
  components: {
    'modal': ModalComponent,
  },
  props: {
    album: {
      type: Object,
      default: null
    },
    tracks: {
      type: Array,
      default: () => []
    },
    credits: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      selectedTrack: null,
      selectedTrackCredits: null
    }
  },
  computed: {
    coverArtUrl() {
      // console.log(this.album.coverart_url)
      // let url = this.album.coverart_url
      // if (!url) {
      //   return ""
      // }
      // if (!/^http/.test(url)) {
      //   url = 'https://' + url
      // }
      // return url
      return addHttps(this.album.coverart_url)
    },
    selectedTrackAudioUrl() {
      if (!this.selectedTrack) return ""
      return addHttps(this.selectedTrack.audiofile_url)
    }
  },
  methods: {
    selectTrack(track, idx) {
      this.selectedTrack = track
      // console.log(this.credits, track.id)
      this.selectedTrackCredits = this.credits[track.id]
    },
    openLyricsModal() {
      this.$refs.lyrics.open();
    }
  }
}
</script>