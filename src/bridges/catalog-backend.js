import * as Archive from "@/modules/catalog/models"

export default function (catalogPlugin, backendPlugin) {

  // Album fetching
  catalogPlugin.mainCatalog.albumFetch = async (id) => {

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
  catalogPlugin.mainCatalog.trackFetch = async (id) => {

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
}