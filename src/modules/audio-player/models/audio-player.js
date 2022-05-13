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
    this._skipStep      = 10
    this._volume        = 0.25
    this._isPlaying     = false
    this._currentTrack  = null

    this.init()
    this.initMediaSession()
  }

  
  init() {
    if (this._initialized) return

    this._initialized = true

    this.audio          = new Audio()
    this.audio.volume   = this._volume
    this.audio.preload  = 'auto'

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

  initMediaSession() {

    let ms = navigator.mediaSession
    ms.setActionHandler('nexttrack', (details) => {
      this.next()
    })

    ms.setActionHandler('pause', (details) => {
      this.pause()
    })

    ms.setActionHandler('play', (details) => {
      this.play()
    })

    ms.setActionHandler('seekforward', (details) => {
      this.currentTime += this._skipStep
    })

    ms.setActionHandler('seekbackward', (details) => {
      this.currentTime -= this._skipStep
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
  }

  /**
   * Gets the duration of the track
   */
  get duration() {
    return this._duration
  }

  /**
   * Gets the time advance of the track (in seconds)
   */
  get currentTime() {
    return this._currentTime
  }

  /**
   * Sets the time advance of the track (in seconds)
   */
  set currentTime(val) {
    this.audio.currentTime = this._currentTime = Math.max(val, 0)
  }

  /**
   * Gets the current track in the player
   */
  get currentTrack() {
    return this._currentTrack
  }

  /**
   * True if the track is currently playing
   */
  get isPlaying() {
    return this._isPlaying
  }

  /**
   * Gets the queue. Do not change the queue, only read on it.
   */
  get queue() {
    return this._queue
  }

  /**
   * Gets the length of the queue (including previous and current track)
   */
  get queueLength() {
    return this.queue.queueLength
  }

  /**
   * @returns {number} Volume between 0 and 1
   */
  get volume() {
    return this._volume
  }

  /**
   * @param {number} value Volume between 0 and 1
   */
  set volume(value) {
    this._volume = Math.max(0, Math.min(value, 1))
    this.audio.volume = this._volume
  }

  play() {
    this._isPlaying = true
    this.audio.play()
  }

  pause() {
    this.audio.pause()
    this._isPlaying = false
  }

  /**
   * Moves back to the start of the track
   */
  toStart() {
    this.currentTime = 0
  }

  /**
   * Moves to the end of the track
   */
  toEnd() {
    this.currentTime = this.duration
  }

  /**
   * Advances the queue
   */
  next() {
    this._queue.moveToNext()
    let track = this._queue.currentTrack
    this.setTrack(track)
  }

  /**
   * Moves back into the queue
   */
  previous() {
    this._queue.moveToPrevious()
    let track = this._queue.currentTrack
    this.setTrack(track)
  }

  /**
   * Leaps to a specific position in the queue
   * @see {AudioPlayerQueue.moveHeadAt}
   * @param {number} position 
   */
  moveToPosition(position) {
    this._queue.moveHeadAt(position)
    let track = this._queue.currentTrack
    this.setTrack(track)
  }

  /**
   * Leaps to a specific track in the queue if it exists
   * @param {Track} track 
   * @returns 
   */
  moveToTrack(track) {
    let pos = this._queue.trackPositionInQueue(track)
    if (pos === null) return false
    this.moveToPosition(pos)
    return true
  }

  /**
   * Adds a track on top of the queue
   * @see {AudioPlayerQueue.addToQueue}
   * @param {number} position 
   */
  pushToQueue(track) {
    this._queue.addToQueue(track)
  }

  /**
   * Adds a track in the queue just after the track currently playing
   * @see {AudioPlayerQueue.addAsNextTrack}
   * @param {number} position 
   */ 
  pushAsNextTrack(track) {
    return this._queue.addAsNextTrack(track)
  }

  /**
   * Removes a track from the queue
   * @param {AudioPlayer.Track} track 
   * @returns 
   */
  removeTrack(track) {
    /** TODO: handle all the edges cases of removal of tracks currently playlist ... */
    return this._queue.removeTrackFromQueue(track)
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API