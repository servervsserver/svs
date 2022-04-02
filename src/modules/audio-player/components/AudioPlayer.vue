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

    <section class="playlist">
      <div class="buttons">
        <button
          class="button svs-button-transparent"
          @mousedown="toggleListDisplay()"
        >
          <span class="icon">
            <i class="fa-solid fa-list-ol"></i>
            </span>
        </button>
      </div>
    </section>

    <modal ref="playlistModal">
      <h3>Previous tracks</h3>
      <ul >
        <li 
          v-for="(track, idx) of previousTracks"
          :key="idx"
        > 
          <div class="track-base-metadatas">
            <span class="track-name">
              {{ track.name }}
            </span>
            <span class="artist-name">
              {{ track.artist }}
            </span>
          </div>
        </li>
      </ul>
      <h3>Next tracks</h3>
      <ul >
        <li 
          v-for="(track, idx) of nextTracks"
          :key="idx"
        > 
          <div class="track-base-metadatas">
            <span class="track-name">
              {{ track.name }}
            </span>
            <span class="artist-name">
              {{ track.artist }}
            </span>
          </div>
        </li>
      </ul>
    </modal>
  </div>
</template>

<script>

import ProgressBar from "./ProgressBar.vue"
import ModalComponent from "@/components/Modal.vue"
import { AudioPlayer } from "../models"

export default {
  name: 'AudioPlayer',
  components: {
    'audio-progress-bar': ProgressBar,
    'modal': ModalComponent
  },
  // props: {
  //   audioPlayer: {
  //     type: AudioPlayer,
  //     default: () => new AudioPlayer()
  //     // required: true
  //   }
  // },
  data() {
    return {
      audioPlayer: new AudioPlayer(),
      tick: 0
    }
  },
  mounted() {
    this.audioPlayer.onTimeUpdate = (evt) => {
      this.$emit('timeupdate', event)
    }
    console.log(this, this.$svsAudioPlayer)
    // setInterval(() => {
    //   this.forceRerender()
    //   console.log(this.audioPlayer)
    // }, 500)
  },
  computed: {
    isPlaying() {
      return this.audioPlayer.isPlaying
    },
    duration() {
      return this.audioPlayer.duration
    },
    currentTime: {
      get: function() {
        return this.audioPlayer.currentTime
      },
      set: function(val) {
        this.audioPlayer.currentTime = val
        // console.log(val)
      }
    },
    currentTrack() {
      return this.audioPlayer.currentTrack
    },
    previousTracks() {
      return this.audioPlayer.queue.playedTracks
    },
    nextTracks() {
      return this.audioPlayer.queue.tracks
    }
  },
  methods: {
    forceRerender() {
      // console.log("Did you force my rerender?")
      // this.tick += 1
    },
    play() {
      this.audioPlayer.play()
    },
    pause() {
      this.audioPlayer.pause()
    },
    togglePlayPause() {
      if (this.audioPlayer.isPlaying) {
        this.pause()
      } else {
        this.play()
      }
    },
    onMouseDownBackward() {
      let wasPlaying = this.isPlaying
      if (this.currentTime < 5) {
        this.audioPlayer.previous()
      }
      this.audioPlayer.toStart()
      if (wasPlaying) this.play()
    },
    onMouseDownForward() {
      let wasPlaying = this.isPlaying
      this.audioPlayer.next()
      if (wasPlaying) this.play()
    },
    toggleListDisplay() {
      this.$refs.playlistModal.toggle()
    }
  },
  beforeDestroy() {
    this.audioPlayer.destroy()
    this.audioPlayer = null
  }
}
</script>

<style scoped lang='scss'>
.audio-player-container {
  display: flex;
  height: 60px;
  justify-content: center;
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

  .playlist {
    display: flex;
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

.audio-player-container {
  color: #FFFADE;
  background: #333366;
}

</style>
