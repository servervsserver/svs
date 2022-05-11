import { v4 as generateUuid } from "uuid"

import { Track } from "./track"
import { AudioPlayerQueue } from "./queue"

export const PlayMode = Object.freeze({
  STOP: 0,
  LOOP_TRACK: 1,
  LOOP_QUEUE: 2
})
/**
 * The actual audioplayer
 */
export class AudioPlayer {

  /***
   * Creates a new audio player
   */
  constructor() {

    /**
     * @type {boolean} If set to true, moving in the queue will start the next track directly
     */
    this.autoPlay = true

    /**
     * @type {number} Defines the behavior when arriving at the end of a track
     * @see PlayMode
     */
    this.playMode = PlayMode.LOOP_QUEUE

    this._queue = new AudioPlayerQueue()

    // this._queue.addToQueue(
    //   new Track(
    //     "-1",
    //     "Drum loop",
    //     "Jiway",
    //     "/placeholders/audio/drumloop.wav"
    //   )
    // )
    // this._queue.addToQueue(
    //   new Track(
    //     "-2",
    //     "Stanky groovey",
    //     "Jiway",
    //     "/placeholders/audio/stankygroovy.wav"
    //   )
    // )
    // this._queue.addToQueue(
    //   new Track(
    //     "-3",
    //     "Vesper Martini",
    //     "Jiway",
    //     "/placeholders/audio/vespermartini_jiway.mp3"
    //   )
    // )

    this._duration      = 0
    this._currentTime   = 0
    this._isPlaying     = false
    this._currentTrack  = null

    this.init()
  }

  
  init() {
    if (this._initialized) return

    this._initialized = true

    this.audio = new Audio()
    this.audio.volume = 0.5
    this.audio.preload = 'auto'

    // this._queue.moveToNext()
    let track = this._queue.currentTrack
    this.setTrack(track)

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
      
      switch(this.playMode) {
        case PlayMode.STOP:
          this.pause()
          break;
        case PlayMode.LOOP_TRACK:
          this.toStart()
          this.play()
          break;
        case PlayMode.LOOP_QUEUE:
          if (this._queue.isAtTheEnd) {
            this._queue.moveToBottom()
            let track = this._queue.currentTrack
            this.setTrack(track)
          } else {
            this._queue.moveToNext()
            let track = this._queue.currentTrack
            this.setTrack(track)
          }
          this.play()
          break;
      }
      // this.next()
      console.log(this._queue)
    })
  }

  /**
   * Sets the currently playing track
   * @param {Track} track 
   */
  setTrack(track) {
    if (!track) return

    this._currentTrack  = track
    this.audio.src      = track.source

    navigator.mediaSession.metadata = track.mediaMetadata
    
    if (this.autoPlay) {
      this.play()
    }
  }

  /**
   * Destroy the resources in the audio player
   * @returns 
   */
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

  get queue() {
    return this._queue
  }

  get queueLength() {
    return this.queue.queueLength
  }

  /**
   * @returns {number} Volume between 0 and 1
   */
  get volume() {
    return this.audio.volume
  }

  /**
   * @param {number} value Volume between 0 and 1
   */
  set volume(value) {
    return
  }

  play() {
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
    this._queue.moveToNext()
    let track = this._queue.currentTrack
    this.setTrack(track)
    console.log(this._queue)
  }

  previous() {
    this._queue.moveToPrevious()
    let track = this._queue.currentTrack
    this.setTrack(track)
  }

  moveToPosition(position) {
    this._queue.moveHeadAt(position)
    let track = this._queue.currentTrack
    this.setTrack(track)
  }

  moveToTrack(track) {
    let pos = this._queue.trackPositionInQueue(track)
    if (!pos) return false
    this.moveToPosition(pos)
    return true
  }

  pushToQueue(track) {
    this._queue.addToQueue(track)
  }

  pushAsNextTrack(track) {
    return this._queue.addAsNextTrack(track)
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API