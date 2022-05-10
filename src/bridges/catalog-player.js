import * as Archive from "@/modules/catalog/models"
import * as AudioPlayerLogic from "@/modules/audio-player/models"

export default function (catalogPlugin, audioPlayerPlugin) {

  let catalog = catalogPlugin.mainCatalog
  
  catalogPlugin.addActionToTrackListItem(
    {
      icon: { klass: "fa-solid fa-circle-play"},
      fnc: async (track, index) => {
        
        let audioPlayer = audioPlayerPlugin.mainAudioPlayer
        let album = await catalog.asyncGetAlbumById(track.albumId)

        let aplTrack = new AudioPlayerLogic.Track(
          track.id, 
          track.title, 
          album.title, 
          track.trackUrl
        )
        aplTrack.album = album

        if (audioPlayer.pushAsNextTrack(aplTrack))
          audioPlayer.next()
        else {
          audioPlayer.moveToTrack(aplTrack)
        }
  
        audioPlayer.play()
      }
    }
  )
}