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

class AudioPlayerTrack {

  constructor(name, artist, source) {
    this.name   = name
    this.artist = artist
    this.source = source
  }
}


class AudioPlayerQueue {

  constructor() {
    this._tracks = []
    this._playedTracksStack = []
  }

  enqueue(track) {
    this._tracks.push(track)
  }

  dequeue() {
    let track = this._tracks.shift()
    this._playedTracksStack.push(track)
    return track
  }

  requeue() {
    if (!this.hasPlayedTracks) return null
    let track = this._playedTracksStack.pop()
    this._tracks.unshift(track)
    return track
  }

  peek() {
    if (this.empty) return null
    return this._tracks[0]
  }

  get empty() {
    return !this._tracks.length
  }

  get hasPlayedTracks() {
    return !!this._playedTracksStack.length
  }

  get tracks() {
    return this._tracks
  }

}

class AudioPlayerLogic {

  constructor() {

    this._queue = new AudioPlayerQueue()
    this._queue.enqueue(
      new AudioPlayerTrack(
        "Drum loop",
        "Jiway",
        "/placeholders/audio/drumloop.wav"
      )
    )
    this._queue.enqueue(
      new AudioPlayerTrack(
        "Stanky groovey",
        "Jiway",
        "/placeholders/audio/stankygroovy.wav"
      )
    )
    this._queue.enqueue(
      new AudioPlayerTrack(
        "Vesper Martini",
        "Jiway",
        "/placeholders/audio/vespermartini_jiway.mp3"
      )
    )

    this._duration = 0
    this._currentTime = 0
    this._isPlaying = false
    this._currentTrack = null

    this.init()
  }

  init() {
    if (this._initialized) return

    this._initialized = true

    this.audio = new Audio()
    this.audio.volume = 0.5
    this.audio.preload = 'auto'

    this.setTrack(this._queue.dequeue())

    this.onTimeUpdate = (evt) => {
      console.log(evt)
    }
    this.audio.addEventListener( 'timeupdate', (evt) => {
      this._currentTime = this.audio.currentTime
      if (this.onTimeUpdate)
        this.onTimeUpdate(evt)
    })

    this.audio.addEventListener( 'loadedmetadata', (evt) => {
      this._duration = this.audio.duration || 22
    })

    this.audio.addEventListener( 'ended', (evt) => {
      this.next()
    })
  }

  setTrack(track) {
    this._currentTrack  = track
    this.audio.src      = track.source
  }

  destroy() {
    if (!this._initialized) return
    this._initialized = false

    this.audio.src = null
    //
    // this.audio.removeEventListener( 'timeupdate' )
    //
    // this.audio.removeEventListener( 'loadedmetadata' )
    //
    // this.audio.removeEventListener( 'ended' )
  }

  get duration() {
    return this._duration
  }

  get currentTime() {
    return this._currentTime
  }

  set currentTime(val) {
    this.audio.currentTime = Math.max(val, 0)
  }

  get currentTrack() {
    return this._currentTrack
  }

  get isPlaying() {
    return this._isPlaying
  }

  play() {
    this.audio.volume = 0.5
    this._isPlaying = true
    this.audio.play()
  }

  pause() {
    this.audio.pause()
    this._isPlaying = false
  }

  toStart() {
    this.currentTime = 0
  }

  toEnd() {
    this.currentTime = this.duration
  }

  next() {
    if (this._queue.empty) return
    this.setTrack(this._queue.dequeue())
  }

  previous() {
    if (!this._queue.hasPlayedTracks) return
    this.setTrack( this._queue.requeue())
  }
}

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
