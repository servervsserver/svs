import * as Archive from "@/modules/catalog/models"

export default function (catalogPlugin, backendPlugin) {

  /**
   * @type {Archive.AsyncCatalog}
   */
  let catalog = catalogPlugin.mainCatalog

  // Album fetching
  catalog.albumFetch = async (id) => {

    let fAlbum = await backendPlugin.getAlbumById(id)
    if (!fAlbum) return null

    let aAlbum = new Archive.Album(
      id,
      fAlbum.server_id,
      fAlbum.name,
      fAlbum.coverart_url
    )

    console.log(fAlbum)

    aAlbum.setAdditionalData('External stream link', fAlbum.streaming_link || undefined)
    aAlbum.setAdditionalData('Visualizer link', fAlbum.visualizer_link || undefined)
    
    aAlbum.trackIds = [...fAlbum.tracks_ids]

    return aAlbum

  }

  // Track fetching
  catalog.trackFetch = async (id) => {

    let fTrack = await backendPlugin.getTrackById(id)
    if (!fTrack) return null

    let aTrack = new Archive.Track(
      id,
      fTrack.name,
      fTrack.audiofile_url
    )
    
    aTrack.lyrics = fTrack.lyrics

    if (fTrack.genres) 
      aTrack.genres = [...new Set(fTrack.genres)]
    
    aTrack.albumId = fTrack.album_id
    
    return aTrack
    
  }

  // Author fetching
  catalog.serverFetch = async (id) => {
    let fServer = await backendPlugin.getServerById(id)
    if (!fServer) return null

    let aServer = new Archive.Server(
      fServer.id,
      fServer.name,
      fServer.icon_url,
      fServer.description,
      fServer.icon_url,
      fServer.is_private ? null : fServer.discord_invite
    )
    return aServer
  }

  catalog.albumCollectionFetch = async (id) => {
    let fAC = await backendPlugin.getAlbumCollectionById(id)
    if (!fAC) return null

    let aAC = new Archive.AlbumCollection()
    
    aAC.id             = fAC.id
    aAC.name           = fAC.name
    aAC.description    = fAC.description
    aAC.albumsIds      = [...fAC.albums_ids]
    aAC.subCollections = []

    if (fAC.sub_collections) {
      for (let fSC of fAC.sub_collections) {
        let aSC = new Archive.AlbumSubcollection()
        aSC.name = fSC.name
        aSC.description = fSC.description
        aSC.albumsIds = fSC.albums_ids ? [...fSC.albums_ids] : []
        aAC.subCollections.push(aSC)
      }
    }
    return aAC
  }
}