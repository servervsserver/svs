import { v4 as generateUuid } from "uuid"
/**
 * Represents a track in the audio player
 */
export class Track {

  constructor(id, name, artist, source) {

    this._vueId = generateUuid()

    /**
     * @type {string} Unique identifier for the track
     */
    this.id     = id
    /**
     * @type {string} Title of the track
     */
    this.name   = name
    /**
     * @type {string} Artist of the track
     */
    this.artist = artist
    
    /**
     * Audio source for the track
     */
    this.source = source
  }

  /**
   * Only used by vue to have a unique id for the UI
   */
  get vueid() {
    return this._vueId
  }

}

/**
 * Represents the queue list of the track.
 * 
 * By convention the queue is indexed from ]-inf;+inf[ :
 * - Zero is the track currently played.
 * - Positive numbers represent tracks that are coming
 * - Negative numbers represent played tracks
 */
export class AudioPlayerQueue {

  constructor() {
    this._tracks        = []
    this._maxQueueLimit = 1000
    this._currentIndex  = 0
    this._noDuplicate   = true
  }

  get noDuplicate() {
    return this;this._noDuplicate
  }

  /**
   * Converts an idx to a position
   * @param {number} idx 
   * @returns 
   */
  _idxToPosition(idx) {
    return idx - this._currentIndex
  }
  
  /**
   * Converts a position to an index
   * @param {number} position 
   * @returns 
   */
  _positionToIdx(position) {
    return position + this._currentIndex
  }

  /**
   * Finds the position of a track in the queue 
   * @param {Track} track 
   * @returns {number|null} The position of the track in the queue, null if not found.
   */
  trackPositionInQueue(track) {
    if (!track) {
      console.error("You must give a track to find its position!")
      return null
    }
    let idx = this._tracks.findIndex(val => {
      return val.id === track.id
    })
    if (idx < 0) return null
    return this._idxToPosition(idx)
  }

  /**
   * 
   * @param {Track} track 
   * @returns True if the track is the queue false otherwise
   */
  trackIsInQueue(track) {
    return this.trackPositionInQueue(track) !== null
  }

  /**
   * Adds a track to the queue
   * If noDuplicate is on, it won't be inserted if it is already in the list
   * @param {Track} track Track to add
   * @returns True if inserted, false otherwise
   */
  addToQueue(track) {
    if (this.trackIsInQueue(track)) return false
    this._tracks.push(track)
    return true
  }

  /**
   * Adds a track to the queue as the track playing after the current track
   * If noDuplicate is on, it won't be inserted if it is already in the list
   * @param {Track} track Track to add
   * @returns {boolean} True if inserted, false otherwise
   */
  addAsNextTrack(track) {
    if (this.trackIsInQueue(track)) return false
    this._tracks.splice(this._currentIndex + 1, 0, track)
    return true
  }

  /**
   * Removes a track from the queue, wherever it is
   * @param {Track} track 
   */
  removeTrackFromQueue(track) {
    let pos = this.trackPositionInQueue(track)
    if (pos === null) return null
    return this.removeTrackAtPosition(pos)
  }

  /**
   * Removes a track at a specific position.
   * @param {number} position Position of the track to remove
   * @returns {Track|null} The track removed if removed, null if the position is invalid
   */
  removeTrackAtPosition(position) {
    let idx = this._idxToPosition(position)
    if (idx >= this.queueLength) {
      console.warn("The position is outside of the queue (too big)")
      return null
    }
    if (idx < 0) {
      console.warn("The position is outside of the queue (too low)")
      return null
    }
    let [trackRemoved] =  this._tracks.splice(idx,1)[0]
    if (this._currentIndex > idx) this._currentIndex -= 1
    return trackRemoved
  }

  /**
   * Moves the head to a new index in the playlist.
   * - If index is too small, the index is set to 0
   * - If index is too big, the index is at the last index possible
   * @param {number} index 
   * @returns The move of the index to get to the new index
   */
  _moveHeadAtIndex(index) {
    if (index < 0) {
      index = 0
      console.warn("The position is outside of the queue (too low). Position set to the bottom of the queue")
    } else if (index >= this.queueLength) {
      index = this.queueLength - 1
      console.warn("The position is outside of the queue (too big). Position set to the end of the queue")
    }

    let diff = this._currentIndex - index
    this._currentIndex = index
    return diff
  }

  /**
   * Moves the head to a new position in the playlist
   * - If position is too small, the position is set to bottomPosition
   * - If position is too big, the position is at the endPosition
   * @param {number} position 
   * @returns The move of the position to get to the new position
   */
  moveHeadAt(position) {
    let idx = this._positionToIdx(position)
    return this._moveHeadAtIndex(idx)
  }

  /**
   * Moves the head by steps amount of tracks.
   * - negative means previously played tracks
   * - positive means upcoming tracks
   * @param {number} steps 
   * @returns The move of the position to get to the new position
   */
  moveHeadBy(steps) {
    return this._moveHeadAtIndex(this._currentIndex + steps)
  }
  
  /**
   * Moves the head by exactly 1 track forward (or 0 if at the end of the queue).
   * @returns The move of the position to get to the new position
   */
  moveToNext() {
    return this.moveHeadBy(1)
  }

  /**
   * Moves the head by exactly 1 track backward (or 0 if at the bottom of the queue).
   * @returns The move of the position to get to the new position
   */
  moveToPrevious() {
    return this.moveHeadBy(-1)
  }

    /**
   * Moves the head to the bottom of the queue
   * @returns The move of the position to get to the new position
   */
  moveToBottom() {
    return this.moveHeadBy(this.bottomPosition)
  }

  _getTrackAtIndex(index) {
    if (index >= this._tracks.length) return null
    if (index < 0) return null
    return this._tracks[index]
  }

  getTrackAtPosition(position) {
    return this._getTrackAtIndex(this._positionToIdx(position))
  }

  get currentTrack() {
    return this._getTrackAtIndex(this._currentIndex)
  }

  get queueLength() {
    return this._tracks.length
  }
  
  get bottomPosition() {
    return this._idxToPosition(0)
  }

  get endPosition() {
    return this._idxToPosition(this.queueLength - 1)
  }

  get isAtTheEnd() {
    return this.endPosition == 0
  }

  get tracks() {
    return this._tracks
  }

}


// export class AudioPlayerQueueOld {

//   constructor() {
//     this._tracks = []
//     this._playedTracksStack = []
    
//     this._noDuplicate = true
//   }

//   /**
//    * Gets the index of a track in the queue.
//    * @see indexOfTrackInPlayedQueue
//    * @param {Track | string} trackOrId 
//    * @returns Index of the track if found, -1 otherwise
//    */
//   indexOfTrackInQueue(trackOrId) {
//     let id = (typeof trackOrId === "string" ? trackOrId : trackOrId.id)
//     if (id === undefined || null) {
//       console.warn("Cannot find the index of a track with no id in the queue.")
//       return -1
//     }
//     return this._tracks.findIndex(val => {
//       return val.id === id
//     })
//   }

//     /**
//    * Gets the index of a track in the played queue.
//    * @see indexOfTrackInQueue
//    * @param {Track | string} trackOrId 
//    * @returns Index of the track if found, -1 otherwise
//    */
//   indexOfTrackInPlayedQueue(trackOrId) {
//     let id = (typeof trackOrId === "string" ? trackOrId : trackOrId.id)
//     if (id === undefined || null) {
//       console.warn("Cannot find the index of a track with no id in the queue.")
//       return -1
//     }
//     return this._playedTracksStack.findIndex(val => {
//       return val.id === id
//     })
//   }

//   /**
//    * Adds a track at the end of the queue
//    * @param {Track} track 
//    */
//   enqueue(track) {
//     if (this._noDuplicate) {
//       let idx = this.indexOfTrackInQueue(track)
//       if (idx >= 0) {
//         console.warn("Track already in play queue at", idx)
//         return
//       }
//       idx = this.indexOfTrackInPlayedQueue(track)
//       if (idx >= 0) {
//         console.warn("Track already in played queue at", idx)
//       }
//     }
//     this._tracks.push(track)
//   }

//   /**
//    * Removes a track from the bottom of the queue
//    * @returns 
//    */
//   dequeue() {
//     let track = this._tracks.shift()
//     this._playedTracksStack.push(track)
//     return track
//   }

//   /**
//    * Take the last played track and moves it at the start of the play queue
//    * @returns 
//    */
//   requeue() {
//     if (!this.hasPlayedTracks) return null
//     let track = this._playedTracksStack.pop()
//     this._tracks.unshift(track)
//     return track
//   }

//   /**
//    * Insert a track at the bottom of the queue
//    * @param {Track} track 
//    * @returns 
//    */
//   insertAsFirst(track) {
//     this._tracks.unshift(track)
//     return track
//   }

//   /**
//    * Peeks at the bottom track of the queue
//    * @returns 
//    */
//   peek() {
//     if (this.empty) return null
//     return this._tracks[0]
//   }

//   /**
//    * True if the queue is empty
//    */
//   get empty() {
//     return !this._tracks.length
//   }

//   /**
//    * True if tracks have been played in this queue
//    */
//   get hasPlayedTracks() {
//     return !!this._playedTracksStack.length
//   }

//   /**
//    * Get the list of tracks in the queue
//    */
//   get tracks() {
//     return this._tracks
//   }

//   /**
//    * Get the list of played tracks in the queue
//    */
//   get playedTracks() {
//     return this._playedTracksStack
//   }

//   /**
//    * Gets the track that should currently be playing
//    */
//   get currentTrack() {
//     if (!this._playedTracksStack || !this._playedTracksStack.length)
//       return null
//     return this._playedTracksStack[this._playedTracksStack.length-1]
//   }

// }

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
    this.playMode = PlayMode.STOP

    this._queue = new AudioPlayerQueue()

    this._queue.addToQueue(
      new Track(
        "-1",
        "Drum loop",
        "Jiway",
        "/placeholders/audio/drumloop.wav"
      )
    )
    this._queue.addToQueue(
      new Track(
        "-2",
        "Stanky groovey",
        "Jiway",
        "/placeholders/audio/stankygroovy.wav"
      )
    )
    this._queue.addToQueue(
      new Track(
        "-3",
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
    this.audio.volume = 0.1
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
    this._currentTrack  = track
    this.audio.src      = track.source
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

  play() {
    this.audio.volume = 0.2
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

  pushToQueue(track) {
    this._queue.addToQueue(track)
  }

  pushAsNextTrack(track) {
    return this._queue.addAsNextTrack(track)
  }
}