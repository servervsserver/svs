import {
  Track,
  Album,
  // ArchiveAccoladeEntry,
  // ArchiveAccoladeType,
  // ArchiveAccolade
} from "./archive-entry.js"


/**
* Archive catalog. It should be used as a cache for the catalogue
*/
export class Catalog {

  constructor() {

    /**
     * @type {Map<string, Album>} All the eps in the catalog
     */
    this.eps        = new Map()

    /**
     * @type {Map<string, Track>}
     */
    this.tracks     = new Map()
    this.accolades  = new Map()

  }

  /**
   * 
   * @param {Track} track 
   * @returns 
   */
  addTrack(track) {
    if (!track) {
      console.error("You can't add a null track")
      return null
    }
    if (!this.tracks) this.tracks = new Map()
    if (!track.id) {
      console.error("The track must have an id")
      return
    }
    if (this.tracks.has(track.id)) {
      console.warn("There is already a track with that id")
      return null
    }
    this.tracks.set(track.id, track)

    return track
  }

  addEp(ep) {
    if (!ep) {
      console.error("You can't add a null EP")
      return null
    }
    if (!this.eps) this.eps = new Map()
    if (!ep.id) {
      console.error("The EP must have an id")
      return
    }
    if (this.eps.has(ep.id)) {
      console.warn("There is already an EP with that id")
      return null
    }
    this.eps.set(ep.id, ep)

    return ep
  }

  getAllTracks() {
    let all = []
    for(let [id,track] of this.tracks) {
      all.push(track)
    }
    return all
  }

  getAllEps() {
    let all = []
    for(let [id, ep] of this.eps) {
      all.push(ep)
    }
    return all
  }

}
