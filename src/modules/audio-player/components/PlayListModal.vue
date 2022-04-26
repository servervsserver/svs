<template>
  <div
    class="modal svs-modal"
    :class="{'is-active': openedData}"
  >
    <!-- <div
      class="modal-background"
      @click="close"
    /> -->
    <div class="modal-card">
      <header
        class="modal-card-head"
      >
        <strong>Playlist</strong>
        <button
          class="button svs-button-transparent"
          @click="close"
        >
          <span class="icon">
            <i class="fa-solid fa-circle-xmark" />
          </span>
        </button>
      </header>
      <section class="modal-card-body">
        <!-- <h3>Previous tracks</h3> -->
        <ul class="playlist-items">
          <li
            v-for="(track, idx) of tracks"
            :key="track.vueid"
            class="playlist-item clickable"
            :class="{ 
              'track-played': idx < idxCurrentTrack , 
              'track-playing': idx == idxCurrentTrack,
              'track-toplay': idx > idxCurrentTrack }"
            @click="onTrackClick(idx - idxCurrentTrack, track)"
          > 
            <div
              class="track-position"
            >
              {{ idx - idxCurrentTrack }}
            </div>
            <div class="track-base-metadatas">
              <span class="track-name">
                {{ track.name }}
              </span>
              <span class="artist-name">
                {{ track.artist }}
              </span>
            </div>
          </li>
        <!-- </ul> -->
        <!-- <h3>Next tracks</h3> -->
        <!-- <ul > -->
          <!-- <li
            class="playlist-item track-toplay"
            v-for="(track) of nextTracks"
            :key="track.vueid"
          > 
            <div class="track-base-metadatas">
              <span class="track-name">
                {{ track.name }}
              </span>
              <span class="artist-name">
                {{ track.artist }}
              </span>
            </div>
          </li> -->
        </ul>
      </section>
      <footer
        v-if="$slots.footer"
        class="modal-card-foot"
      >
        <slot name="footer" />
      </footer>
    </div>
    <button 
      class="modal-close is-large" 
      aria-label="close"
      @click="close"
    />
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
    onTrackClick(position, track) {
      this.$emit('track-click', position, track)
    }
  }
}
</script>

<style scoped lang='scss'>
.svs-modal {
  pointer-events: none;

  .modal-card {
    box-shadow: 3px 2px 6px 2px #0004;
    pointer-events: all;
  }
  .modal-card-head {
    background: #F5816B !important;
  }
  .modal-card-body {
    background: #333366 !important;
    padding: 4px;
  }

  .playlist-items {
    list-style: none;
    display: flex;
    flex-direction: column;
    margin: 0px;

    .playlist-item {
      display: flex;
      flex-direction: row;
      align-items: center;
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

      .track-position {
        width: 2em;
        text-align: center;;
      }

      &.track-played {
        font-style: italic;
      }
      
      &.track-playing {
        text-shadow: 1px 1px 2px #F5816B;
        box-shadow: 0px 0px 1px 2px #F5816B80 inset;
      }
      // &.track-toplay {
      //   // font-style: italic;
      // }
    }

  }
}
</style>