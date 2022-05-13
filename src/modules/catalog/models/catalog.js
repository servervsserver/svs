import { TrackCreditsEntry } from "./credits"
import { Track } from "./track"
import { Album } from "./album"
import { Server } from "./server"
import { AlbumCollection } from "./album-collection"

/**
* Archive catalog. It should be used as a cache for the catalogue
* @deprecated Use AsyncCatalog instead.
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
     * @type {Map<string, Server>}
     */
    this._servers   = new Map()

    /**
     * @type {Map<string, TrackCreditsEntry}
     */
    this._trackCreditsEntries = new Map()

    /**
     * @type {Map<string, AlbumCollection>}
     */
    this._albumCollections  = new Map()

    /**
     * @type {(id: string) => Promise<Album>}
     */
    this._asyncAlbumFetchFnc = null

    /**
     * @type {(id: string) => Promise<Track>}
     */
    this._asyncTrackFetchFnc = null

    /**
     * @type {(id: string) => Promise<Server>}
     */
    this._asyncServerFetchFnc = null

    /**
     * @type {(id: string) => Promise<AlbumCollection>}
     */
    this._asyncAlbumCollectionFetchFnc = null

    /**
     * @type {(id: string) => Promise<TrackCreditsEntry>}
     */
    this._asyncTrackCreditsEntryFetchFnc = null

  }

  /**
   *  @param {(id: string) => Promise<Album|null>} fnc 
   */
  set albumFetch(fnc) {
    this._asyncAlbumFetchFnc = fnc
  }

  /**
   * @param {(id: string) => Promise<Track|null>} fnc 
   */
  set trackFetch(fnc) {
    this._asyncTrackFetchFnc = fnc
  }

  /**
   * @param {(id: string) => Promise<Server|null>} fnc 
   */
  set serverFetch(fnc) {
    this._asyncServerFetchFnc = fnc
  }

  /**
   * @param {(id: string) => Promise<AlbumCollection>} fnc
   */
  set albumCollectionFetch(fnc) {
    this._asyncAlbumCollectionFetchFnc = fnc
  }

  /**
   * @param {(id: string) => Promise<AlbumCollection>} fnc
   */
  set trackCreditsEntryFetch(fnc) {
    this._asyncTrackCreditsEntryFetchFnc = fnc
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
      return null
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
      return null
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
   * @param {Server} server The track to add
   * @returns The track if successfully added, null otherwise.
   */
  addServer(server) {

    if (!server) {
      console.error("You can't add a null server")
      return null
    }

    if (!server.id) {
      console.error("The server must have an id")
      return null
    }
    if (this._servers.has(server.id)) {
      console.warn("There is already a server with that id. Replaced")
    }
    this._servers.set(server.id, server)

    CatalogDb.storeServer(server)

    return server
  }

  /**
   * 
   * @param {AlbumCollection} albumCollection The track to add
   * @returns The track if successfully added, null otherwise.
   */
  addAlbumCollection(albumCollection) {

    if (!albumCollection) {
      console.error("You can't add a null server")
      return null
    }

    if (!albumCollection.id) {
      console.error("The album-collection must have an id")
      return null
    }
    if (this._servers.has(albumCollection.id)) {
      console.warn("There is already a album-collection with that id. Replaced")
    }
    this._servers.set(albumCollection.id, albumCollection)

    // CatalogDb.storeServer(server)

    return albumCollection
  }

  /**
   * @param {TrackCreditsEntry} trackCreditsEntry The track to add
   * @returns The track if successfully added, null otherwise.
   */
  addTrackCreditsEntry(trackCreditsEntry) {

    if (!trackCreditsEntry) {
      console.error("You can't add a null trackCreditsEntry")
      return null
    }

    if (!trackCreditsEntry.id) {
      console.error("The trackCreditsEntry must have an id")
      return null
    }
    if (this._trackCreditsEntries.has(trackCreditsEntry.id)) {
      console.warn("There is already a trackCreditsEntry with that id. Replaced")
    }
    this._trackCreditsEntries.set(trackCreditsEntry.id, trackCreditsEntry)

    // CatalogDb.storeServer(server)

    return trackCreditsEntry
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

  /**
   * 
   * @param {string} id 
   * @returns (id: string) => Promise<Server>
   */
  async asyncGetServerById(id) {
    
    // Try in RAM
    let server = this._servers.get(id)
    if (server) return server

    // Try in cache
    server = await CatalogDb.restoreServer(id)
    if (server) return server
    
    // Try distant
    if (this._asyncServerFetchFnc) 
      server = await this._asyncServerFetchFnc(id)

    if (server) {
      this.addServer(server)
    }

    return server

  }

  async asyncGetAlbumCollectionById(id) {

    // Try in RAM
    let albumCollection = this._albumCollections.get(id)
    if (albumCollection) return albumCollection

    // Try distant
    if (this._asyncAlbumCollectionFetchFnc)
      albumCollection = await this._asyncAlbumCollectionFetchFnc(id)

    if (albumCollection) {
      this.addAlbumCollection(albumCollection)
    }

    return albumCollection
  }

  async asyncGetTrackCreditsEntryById(id) {

    // Try in RAM
    let creditsEntry = this._trackCreditsEntries.get(id)
    if (creditsEntry) return creditsEntry

    // Try distant
    if (this._asyncTrackCreditsEntryFetchFnc)
      creditsEntry = await this._asyncTrackCreditsEntryFetchFnc(id)

    if (creditsEntry) {
      this.addTrackCreditsEntry(creditsEntry)
    }

    return creditsEntry
  }

  async asyncClearCache() {
    await CatalogDb.clearCache()
  } 

  async asyncDeleteCache() {
    await CatalogDb.deleteCache()
  }
  
}