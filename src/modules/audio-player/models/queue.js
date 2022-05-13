import { v4 as generateUuid } from "uuid"

import { Track } from "./track"


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
    console.log(pos, track)
    if (pos === null) return null
    return this.removeTrackAtPosition(pos)
  }

  /**
   * Removes a track at a specific position.
   * @param {number} position Position of the track to remove
   * @returns {Track|null} The track removed if removed, null if the position is invalid
   */
  removeTrackAtPosition(position) {
    let idx = this._positionToIdx(position)
    if (idx >= this.queueLength) {
      console.warn("The position is outside of the queue (too big)")
      return null
    }
    if (idx < 0) {
      console.warn("The position is outside of the queue (too low)")
      return null
    }
    let [trackRemoved] =  this._tracks.splice(idx,1)
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
