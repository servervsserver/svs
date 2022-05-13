<template>
  <section 
    class="audio-player"
    :class="{ 
      'is-fixed': isFixed,
      'is-floating': isFloating,
      'is-anchored-to-bottom': isAnchoredToBottom
    }"
  >
    <div 
      class="audio-player-container"
      :class="{ 
        'shadow-depth-2': isFloating,
        'cartdrige': isFloating
        }"
    >

    <player-layout>
      
      <template v-slot:audioBar>
        <div style="padding: 5px 10px;">
          <audio-progress-bar
            v-model="currentTime"
            :max="duration"
          />
        </div>
      </template>

      <template v-slot:coverArtBig>
        <div class="cover-art-big">
          <squared-image-box>
            <img :src="currentTrackCoverArtUrlBig">
          </squared-image-box>
        </div>
      </template>
      
      <template v-slot:coverArt>
        <div class="cover-art-thumbnail">
          <squared-image-box>
            <img :src="currentTrackCoverArtUrl">
          </squared-image-box>
        </div>
      </template>

      <template v-slot:metadatas>
        <div
          v-if="currentTrack"
          class="track-base-metadatas"
        >
          <div class="track-name">
            {{ currentTrackTitle }}
          </div>
          <div class="artist-name">
            {{ currentTrackAuthor }}
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
      </template>

      <template v-slot:coreControls>

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
      </template>

      <template v-slot:duration>
        <div class="time">{{ duration | duration }}</div>
      </template>

      <template v-slot:currentTime>
        <div class="time">{{ currentTime | duration }}</div>
      </template>

      <template v-slot:volume>
        <div class="volume-button">
          <button class="button svs-button-transparent">
            <span class="icon">
              <i class="fa-solid fa-volume-high" :class="{ 'is-active': isHighVolume }"></i>
              <i class="fa-solid fa-volume-low" :class="{ 'is-active': isMidVolume }"></i>
              <i class="fa-solid fa-volume-off" :class="{ 'is-active': isLowVolume }"></i>
              <i class="fa-solid fa-volume-xmark" :class="{ 'is-active': isNoVolume }"></i>
            </span>
          </button>
          <div class="volume-bar">
            <div class="volume-bar-inner shadow-depth-2">
              <audio-progress-bar 
                v-model="volume"
                :max="1"
              />
            </div>
          </div>
        </div>
      </template>

      <template v-slot:playlist>
        <playlist 
          :queue="queue"
          @track-click="onPlaylistTrackClick"
          @track-delete-click="onPlaylistTrackDeleteClick"
        />
      </template>

    </player-layout>
      <!-- <progress class="progress is-small" value="20" max="100">20%</progress> -->
      <!-- <section class="progress-bar-section">
        <div class="below-bar">
        </div>
      </section> -->
<!-- 
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
      </section> -->

      <!-- <section class="extra">
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
      </section> -->


      <!-- <playlist-modal 
        ref="playlistModal"
        :queue="queue"
        @track-click="onPlaylistTrackClick"
      /> -->
    </div>
  </section>
</template>

<script>

import ProgressBar from "./ProgressBar.vue"
import PlaylistModalComponent from "./PlayListModal.vue"
import PlaylistComponent from "./PlayList.vue"
import PlayerLayout from '../layouts/AudioPlayerLayout.vue'

import { AudioPlayer, PlayMode, Track } from "../models"

export default {
  name: 'AudioPlayer',
  components: {
    'audio-progress-bar': ProgressBar,
    'player-layout': PlayerLayout,
    // 'playlist-modal': PlaylistModalComponent,
    'playlist': PlaylistComponent
  },
  props: {
    fixed: {
      type: Boolean,
      required: false,
      default: true
    },
    anchor: {
      type: String,
      required: false,
      default: 'to-bottom',
      validator( value ) {
        return ['to-bottom'].includes(value)
      }
    },
    floating: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      audioPlayer: new AudioPlayer()
    }
  },
  computed: {
    isFixed() {
      return this.fixed
    },
    isFloating() {
      return this.floating
    },
    isAnchoredToBottom() {
      return this.anchor === 'to-bottom'
    },
    /**
     * True if the volume is high
     */
    isHighVolume() {
      return this.volume > 0.66
    },
    /**
     * True if the volume is normal
     */
    isMidVolume() {
      return this.volume > 0.33 && this.volume < 0.66
    },
    /**
     * True if the volume is low
     */
    isLowVolume() {
      return this.volume > 0 && this.volume < 0.33
    },
    /**
     * True if the volume is 0
     */
    isNoVolume() {
      return this.volume == 0
    },
    /**
     * Volume of the audio player
     */
    volume: {
      get: function() {
        return Math.pow(this.audioPlayer.volume, 0.25)
      },
      set: function(value) {
        this.audioPlayer.volume = Math.pow(value, 4)
      }
    },
    currentTrackTitle() {
      if (!this.currentTrack) return null
      return this.currentTrack.title
    },
    currentTrackCoverArtUrl() {
      if (!this.currentTrack) return null
      if (!this.currentTrack.album) return null
      if (!this.currentTrack.album.coverArtUrl) return null

      let uri = this.currentTrack.album.coverArtUrl
      uri = uri.replace('cover_arts', '250')
      return uri
    },
    currentTrackCoverArtUrlBig() {
      if (!this.currentTrack) return null
      if (!this.currentTrack.album) return null
      if (!this.currentTrack.album.coverArtUrl) return null

      let uri = this.currentTrack.album.coverArtUrl
      uri = uri.replace('cover_arts', '500')
      return uri
    },
    currentTrackAuthor() {
      if (!this.currentTrack) return null
      if (!this.currentTrack.author) return null
      return this.currentTrack.author.name
    },
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
      }
    },
    queueLength() {
      return this.audioPlayer.queueLength
    },
    /**
     * @returns {Track}
     */
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
      this.$emit('timeupdate', evt)
    }
    this.$svsAudioPlayer.mainAudioPlayer = this
  },
  beforeDestroy() {
    this.audioPlayer.destroy()
    this.audioPlayer = null
  },
  methods: {
    /**
     * Plays the current track
     */
    play() {
      this.audioPlayer.play()
    },
    /**
     * Pauses the current track
     */
    pause() {
      this.audioPlayer.pause()
    },
    /**
     * Toggles play/pause
     */
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
      this.audioPlayer.moveToPosition(position)
    },
    onPlaylistTrackDeleteClick(position, track) {
      this.audioPlayer.removeTrack(track)
    },
    cyclePlayMode: (function() {
      let availablePlayModes = [
        PlayMode.LOOP_QUEUE,
        PlayMode.STOP,
        PlayMode.LOOP_TRACK
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
  // height: 60px;
  justify-content: center;
  .below-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > * {
      flex-grow: 1;
    }
  }

  .cover-art-big {
    width: 400px;
    padding: 10px;
    margin-left: calc(50% - 200px + 5px);
  }

  .cover-art-thumbnail {
    width: 50px;
    flex-grow: 0;

    & > * {
      width: 100%;
    }
  }

  .track-base-metadatas {
    padding: 0.5em;
    white-space: nowrap;;
    .track-name {
      font-weight: 500;
      text-overflow: ellipsis;
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

  @media (max-width: 768px) {
    font-size: 0.7rem;
    .cover-art-big {
      width: 200px;
      padding: 10px;
      margin-left: calc(50% - 100px + 5px);
    }
    .cover-art-thumbnail {
      padding: 2px;
      width: 50px;
    }
  }
}

.audio-player-container {
  color: #FFFADE;
  background: #333366;
}

.cartdrige {
  border:#4d4d75 solid 1px;
  border-radius: 5px;
}

// Volume button styling

.volume-button {
  position: relative;
  width: fit-content;

  span {
    i {
      position: absolute;
      width: 17.5px;
      text-align: left;
      transition: opacity 0.15s;
      opacity: 0;

      &.is-active {
        opacity: 1;
      }
    }
  }

  .volume-bar {
    position: absolute;
    top: -5px;
    left: 50%;
    transform: scale(0);
    transition: transform 0.5s;
    transform-origin: 0 50%;
    
    .volume-bar-inner {
      width: 100px;
      padding: 5px;
      border:#4d4d75 solid 1px;
      border-radius: 5px;
      background: #333366;
      transform-origin: 0 50%;
      transform: rotate(-90deg);
    }
  }

  &:hover {
    .volume-bar {
      transform: scale(1);
    }
  }
}

.audio-player {
  background: transparent;
  display: block;

  &.is-fixed {
    position: fixed;
    &.is-anchored-to-bottom {
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0%);
      width: 100vw;
      max-width: 1344px;
    }

    &.is-floating {
      padding: 5px;
      .audio-player-container {
        padding: 2px;
        // box-shadow: 
        //   0 16px 24px 2px rgba(0,0,0,0.14),
        //   0 6px 30px 5px rgba(0,0,0,0.12),
        //   0 8px 10px -7px rgba(0,0,0,0.2);
      }
    }
  }
}

</style>
