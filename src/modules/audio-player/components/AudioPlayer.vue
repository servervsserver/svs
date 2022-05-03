77<template>
  <div class="audio-player-container">
    <!-- <progress class="progress is-small" value="20" max="100">20%</progress> -->
    <section class="progress-bar-section">
      <audio-progress-bar
        v-model="currentTime"
        :max="duration"
      />
      <div class="below-bar">
        <div
          v-if="currentTrack"
          class="track-base-metadatas"
        >
          <div class="track-name">
            {{ currentTrack.name }}
          </div>
          <div class="artist-name">
            {{ currentTrack.artist }}
          </div>
        </div>
        <div
          v-if="!currentTrack"
          class="track-base-metadatas"
        >
          <div class="track-name">
            No track.
          </div>
          <div class="artist-name" />
        </div>

        <div class="controls">
          <div class="buttons">
            <button
              class="button svs-button-transparent"
              @mousedown="onMouseDownBackward()"
            >
              <span class="icon"><i class="fa-solid fa-backward" /></span>
            </button>
            <button
              class="button has-icon svs-button-transparent"
              @click="togglePlayPause()"
            >
              <span class="icon">
                <i
                  v-if="!isPlaying"
                  class="fa-solid fa-play"
                />
                <i
                  v-if="isPlaying"
                  class="fa-solid fa-pause"
                />
              </span>
            </button>
            <button
              class="button has-icon svs-button-transparent"
              @mousedown="onMouseDownForward()"
            >
              <span class="icon"><i class="fa-solid fa-forward" /></span>
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
            <i class="fa-solid fa-list-ol" />
          </span>
        </button>
      </div>
    </section>

    <section class="extra">
      <div class="buttons">
        <button
          class="button svs-button-transparent"
          @mousedown="cyclePlayMode()"
        >
          <span
            v-if="isPlayModeStop"
            class="icon"
          >
            <i class="fa-regular fa-circle-pause" />
          </span>
          <span
            v-if="isPlayModeLoopTrack"
            class="icon"
          >
            <i class="fa-solid fa-repeat" />
            <span>1</span>
          </span>
          <span
            v-if="isPlayModeLoopQueue"
            class="icon"
          >
            <i class="fa-solid fa-repeat" />
          </span>
        </button>
      </div>
    </section>

    <playlist-modal 
      ref="playlistModal"
      :queue="queue"
      @track-click="onPlaylistTrackClick"
    />
  </div>
</template>

<script>

import ProgressBar from "./ProgressBar.vue"
import PlaylistModalComponent from "./PlayListModal.vue"
import { AudioPlayer, PlayMode } from "../models"

export default {
  name: 'AudioPlayer',
  components: {
    'audio-progress-bar': ProgressBar,
    'playlist-modal': PlaylistModalComponent
  },
  data() {
    return {
      audioPlayer: new AudioPlayer(),
      tick: 0
    }
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
    queue() {
      return this.audioPlayer.queue
    },
    playMode() {
      return this.audioPlayer.playMode
    },
    isPlayModeStop() {
      return this.playMode === PlayMode.STOP
    },
    isPlayModeLoopTrack() {
      return this.playMode === PlayMode.LOOP_TRACK
    },
    isPlayModeLoopQueue() {
      return this.playMode === PlayMode.LOOP_QUEUE
    }
  },
  mounted() {
    this.audioPlayer.onTimeUpdate = (evt) => {
      this.$emit('timeupdate', event)
    }
    this.$svsAudioPlayer.mainAudioPlayer = this
    
    // console.log(this, this.$svsAudioPlayer)
    // setInterval(() => {
    //   this.forceRerender()
    //   console.log(this.audioPlayer)
    // }, 500)
  },
  beforeDestroy() {
    this.audioPlayer.destroy()
    this.audioPlayer = null
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
    pushToQueue(track) {
      this.audioPlayer.pushToQueue(track)
    },
    pushAsNextTrack(track) {
      return this.audioPlayer.pushAsNextTrack(track)
    },
    moveToTrack(track) {
      return this.audioPlayer.moveToTrack(track)
    },
    previous() {
      let wasPlaying = this.isPlaying
      this.audioPlayer.previous()
      if (wasPlaying) this.play()
    },
    next() {
      let wasPlaying = this.isPlaying
      this.audioPlayer.next()
      if (wasPlaying) this.play()
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
      this.next()
    },
    toggleListDisplay() {
      this.$refs.playlistModal.toggle()
    },
    onPlaylistTrackClick(position, track) {
      console.log(position, track)
      this.audioPlayer.moveToPosition(position)
    },
    cyclePlayMode: (function() {
      let availablePlayModes = [
        PlayMode.STOP,
        PlayMode.LOOP_TRACK,
        PlayMode.LOOP_QUEUE,
      ]
      let currentPlayModeIdx = 0

      return function() { 
        currentPlayModeIdx += 1
        currentPlayModeIdx %= availablePlayModes.length
        this.audioPlayer.playMode = availablePlayModes[currentPlayModeIdx]
      }
    })()
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

  .playlist,
  .extra {
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
