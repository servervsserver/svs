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

import * as CatalogDb from "./db"

export class AsyncCatalog {

  constructor() {

    /**
     * @type {boolean} Whether to use cache or not
     */
    this.useCache = true


    /**
     * @type {Map<string, Album>} All the eps in the catalog
     */
    this._albums    = new Map()

    /**
     * @type {Map<string, Track>} All the eps in the catalog
     */
    this._tracks    = new Map()



    /**
     * @type {(id: string) => Promise<Album>}
     */
    this._asyncAlbumFetchFnc = null

    /**
     * @type {(id: string) => Promise<Track>}
     */
    this._asyncTrackFetchFnc = null

  }

  /**
   *  @param fnc {(id: string) => Promise<Album|null>}
   */
  set albumFetch(fnc) {
    this._asyncAlbumFetchFnc = fnc
  }

  /**
   * @param fnc {(id: string) => Promise<Track|null>}
   */
  set trackFetch(fnc) {
    this._asyncTrackFetchFnc = fnc
  }

  /**
   * 
   * @param {Track} track The track to add
   * @returns The track if successfully added, null otherwise.
   */
   addTrack(track) {

    if (!track) {
      console.error("You can't add a null track")
      return null
    }

    if (!track.id) {
      console.error("The track must have an id")
      return
    }
    if (this._tracks.has(track.id)) {
      console.warn("There is already a track with that id. Replaced")
    }
    this._tracks.set(track.id, track)

    CatalogDb.storeTrack(track)

    return track
  }

  /**
   * 
   * @param {Album} album The track to add
   * @returns The album if successfully added, null otherwise.
   */
  addAlbum(album) {
    if (!album) {
      console.error("You can't add a null Album")
      return null
    }
    if (!album.id) {
      console.error("The EP must have an id")
      return
    }
    if (this._albums.has(album.id)) {
      console.warn("There is already an Album with that id. Replaced")
    }
    this._albums.set(album.id, album)

    CatalogDb.storeAlbum(album)

    return album
  }

  /**
   * 
   * @param {string} id 
   * @returns (id: string) => Promise<Track>
   */
  async asyncGetTrackById(id) {
    
    // Try in RAM
    let track = this._tracks.get(id)
    if (track) return track

    // Try in cache
    track = await CatalogDb.restoreTrack(id)
    if (track) return track

    // Try distant
    if (this._asyncTrackFetchFnc)
      track = await this._asyncTrackFetchFnc(id)

    if (track) {
      this.addTrack(track)
    }

    return track
  }

  

  /**
   * 
   * @param {string} id 
   * @returns (id: string) => Promise<Album>
   */
  async asyncGetAlbumById(id) {
    
    // Try in RAM
    let album = this._albums.get(id)
    if (album) return album

    // Try in cache
    album = await CatalogDb.restoreAlbum(id)
    if (album) return album

    // Try distant
    if (this._asyncAlbumFetchFnc) 
      album = await this._asyncAlbumFetchFnc(id)

    if (album) {
      this.addAlbum(album)
    }

    return album

  }
}