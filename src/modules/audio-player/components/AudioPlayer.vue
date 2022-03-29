<template>
  <div class="audio-player-container">

    <!-- <progress class="progress is-small" value="20" max="100">20%</progress> -->
    <section class="progress-bar-section">
      <audio-progress-bar
        v-model="currentTime"
        :max="duration"
      />
      <div class="below-bar">
        <div class="track-base-metadatas" v-if="currentTrack">
          <div class="track-name">
            {{ currentTrack.name }}
          </div>
          <div class="artist-name">
            {{ currentTrack.artist }}
          </div>
        </div>
        <div class="track-base-metadatas" v-if="!currentTrack">
          <div class="track-name">
            No track.
          </div>
          <div class="artist-name">
          </div>
        </div>

        <div class="controls">
          <div class="buttons">
            <button
              class="button svs-button-transparent"
              @mousedown="onMouseDownBackward()"
            >
              <span class="icon"><i class="fa-solid fa-backward"></i></span>
            </button>
            <button
              class="button has-icon svs-button-transparent"
              @click="togglePlayPause()"
            >
              <span class="icon">
                <i class="fa-solid fa-play" v-if="!isPlaying"></i>
                <i class="fa-solid fa-pause" v-if="isPlaying"></i>
              </span>
            </button>
            <button
              class="button has-icon svs-button-transparent"
              @mousedown="onMouseDownForward()"
            >
              <span class="icon"><i class="fa-solid fa-forward"></i></span>
            </button>
          </div>
        </div>
        <div class="time">
          {{ currentTime | duration }} - {{ duration | duration }}
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import ProgressBar from "./ProgressBar.vue"

import { AudioPlayerLogic } from "../models"

export default {
  name: 'AudioPlayer',
  components: {
    'audio-progress-bar': ProgressBar
  },
  data() {
    return {
      audio: new AudioPlayerLogic(),
      advance: 8
    }
  },
  mounted() {
    this.audio.onTimeUpdate = (evt) => {
      this.$emit('timeupdate', event)
    }
  },
  computed: {
    isPlaying() {
      return this.audio.isPlaying
    },
    duration() {
      return this.audio.duration
    },
    currentTime: {
      get: function() {
        return this.audio.currentTime
      },
      set: function(val) {
        this.audio.currentTime = val
        // console.log(val)
      }
    },
    currentTrack() {
      return this.audio.currentTrack
    }
  },
  methods: {
    play() {
      this.audio.play()
    },
    pause() {
      this.audio.pause()
    },
    togglePlayPause() {
      if (this.audio.isPlaying) {
        this.pause()
      } else {
        this.play()
      }
    },
    onMouseDownBackward() {
      let wasPlaying = this.isPlaying
      if (this.currentTime < 5) {
        this.audio.previous()
      }
      this.audio.toStart()
      if (wasPlaying) this.play()
    },
    onMouseDownForward() {
      let wasPlaying = this.isPlaying
      this.audio.next()
      if (wasPlaying) this.play()
    }
  },
  beforeDestroy() {
    this.audio.destroy()
    this.audio = null
  }
}
</script>

<style scoped lang='scss'>
.audio-player-container {
  display: flex;
  background: #333366;
  height: 60px;

  .below-bar {
    display: flex;
    justify-content: space-between;
    & > * {
      flex-grow: 1;
    }
  }

  .track-base-metadatas {
    padding: 0.5em;
    .track-name {
      font-weight: 500;
    }

    .artist-name {
      font-weight: 200;
    }
  }

  .controls {
    .buttons {
      flex-wrap: nowrap;
      justify-content: center;
    }
  }

  .progress-bar-section {
    display: block;
    width: 100%;
    position: relative;

    .time {
      padding: 0.5em;
      text-align: right;
      font-variant-numeric: tabular-nums;
    }
  }

}
</style>
