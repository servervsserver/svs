/**
 * Represents a track in the audio player
 */
export class Track {

  constructor(name, artist, source) {
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

}

/**
 * Represents the queue list of the track
 */
export class AudioPlayerQueue {

  constructor() {
    this._tracks = []
    this._playedTracksStack = []
  }

  /**
   * Adds a track at the end of the queue
   * @param {Track} track 
   */
  enqueue(track) {
    this._tracks.push(track)
  }

  /**
   * Removes a track from the bottom of the queue
   * @returns 
   */
  dequeue() {
    let track = this._tracks.shift()
    this._playedTracksStack.push(track)
    return track
  }

  /**
   * Take the last played track and replaces it at the start of the play queue
   * @returns 
   */
  requeue() {
    if (!this.hasPlayedTracks) return null
    let track = this._playedTracksStack.pop()
    this._tracks.unshift(track)
    return track
  }

  /**
   * Peeks at the bottom track of the queue
   * @returns 
   */
  peek() {
    if (this.empty) return null
    return this._tracks[0]
  }

  /**
   * True if the queue is empty
   */
  get empty() {
    return !this._tracks.length
  }

  /**
   * True if tracks have been played in this queue
   */
  get hasPlayedTracks() {
    return !!this._playedTracksStack.length
  }

  /**
   * Get the list of tracks in the queue
   */
  get tracks() {
    return this._tracks
  }

  /**
   * Get the list of played tracks in the queue
   */
  get playedTracks() {
    return this._playedTracksStack
  }

}

/**
 * The actual audioplayer
 */
export class AudioPlayer {

  /***
   * Creates a new audio player
   */
  constructor() {

    this._queue = new AudioPlayerQueue()
    this._queue.enqueue(
      new Track(
        "Drum loop",
        "Jiway",
        "/placeholders/audio/drumloop.wav"
      )
    )
    this._queue.enqueue(
      new Track(
        "Stanky groovey",
        "Jiway",
        "/placeholders/audio/stankygroovy.wav"
      )
    )
    this._queue.enqueue(
      new Track(
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

  /**
   * Sets the currently playing track
   * @param {Track} track 
   */
  setTrack(track) {
    this._currentTrack  = track
    this.audio.src      = track.source
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