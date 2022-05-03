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
    this.albums        = new Map()

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

  addAlbum(album) {
    if (!album) {
      console.error("You can't add a null EP")
      return null
    }
    if (!this.albums) this.albums = new Map()
    if (!album.id) {
      console.error("The EP must have an id")
      return
    }
    if (this.albums.has(album.id)) {
      console.warn("There is already an EP with that id")
      return null
    }
    this.albums.set(album.id, album)

    return album
  }

  getTrackById(id) {
    return this.tracks.get(id) || null
  }

  getAlbumById(id) {
    return this.albums.get(id) || null
  }

  getAllTracks() {
    let all = []
    for(let [id,track] of this.tracks) {
      all.push(track)
    }
    return all
  }

  getAllAlbums() {
    let all = []
    for(let [id, ep] of this.albums) {
      all.push(ep)
    }
    return all
  }

}
