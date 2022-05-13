<template>
  <div
    class="playlist"
  >
    <ul class="playlist-items">
      <li
        v-for="(track, idx) of tracks"
        :key="track.vueid"
        class="playlist-item"
        :class="{ 
          'track-played': idx < idxCurrentTrack , 
          'track-playing': idx == idxCurrentTrack,
          'track-toplay': idx > idxCurrentTrack }"
      > 
        <div class="playlist-item-start">
          <div
            class="track-position"
          >
            {{ idx - idxCurrentTrack }}
          </div>
        </div>
        <div 
          class="playlist-item-center clickable"
          @click="onTrackClick(idx, track)"
        >
          <div class="track-base-metadatas">
            <div class="track-name">
              {{ track.title }}
            </div>
            <div class="artist-name">
              {{ track.author.name }}
            </div>
          </div>
        </div>
        <div class="playlist-item-end">
          <div
            v-if="idx !== idxCurrentTrack"
            class="track-position clickable"
            @click="onDeleteTrack($event, idx, track)"
          >
            <i class="fa-regular fa-circle-xmark" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { AudioPlayerQueue } from "../models"
export default {
  props: {
      opened: {
          type: Boolean,
          default: false
      },
      queue: {
        type: AudioPlayerQueue,
        required: true
      }
  },
  data: function() {
    return {
      openedData: false
    }
  },
  computed: {
    openedClass () { return this.openedData ? "opened":"closed" },
    modeClass () { return `mode-${this.mode}` },
    tracks() {
      return this.queue.tracks
    },
    currentTrack() {
      console.log(this.queue, this.queue.currentTrack)
      return this.queue.currentTrack
    },
    idxCurrentTrack() {
      return 0 - this.queue.bottomPosition
    }
  },
  watch: {
    opened: function(newVal, oldVal) {
      this.openedData = newVal
      // console.log(newVal, oldVal, this)
    }
  },
  methods: {
    open () {
      this.openedData = true
    },
    close () {
      this.openedData = false
    },
    toggle () {
      if (this.openedData) this.close()
      else this.open()
    },
    onTrackClick(idx, track) {
      let position = idx - this.idxCurrentTrack
      this.$emit('track-click', position, track)
    },
    onDeleteTrack(event, idx, track) {
      let position = idx - this.idxCurrentTrack
      this.$emit('track-delete-click', position, track)
    }
  }
}
</script>

<style scoped lang='scss'>
.playlist {
  // pointer-events: none;
  width: 100%;
  height: 100%;
  overflow: auto;

  .playlist-items {
    list-style: none;
    display: flex;
    flex-direction: column;
    margin: 0px;
    width: 100%;

    .playlist-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin: 2px 0px;
      padding: 1em;
      background: #0004;

      & > * {
        margin: 0px 0.5em;
        &:first-child {
          margin-left: 0px;
        }
        &:last-child {
          margin-right: 0px;
        }
      }

      .playlist-item-center {
        flex-grow: 1;
      }

      .track-position {
        width: 2em;
        text-align: center;;
      }

      &.track-played {
        font-style: italic;
        opacity: 0.9;
      }
      
      &.track-playing {
        text-shadow: 1px 1px 2px #F5816B;
        box-shadow: 0px 0px 1px 2px #F5816B80 inset;
      }

      .artist-name {
        font-weight: 200;
        font-size: 0.8em;
      }
    }

  }
}
</style>