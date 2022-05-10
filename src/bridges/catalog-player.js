import * as Archive from "../modules/catalog/models"
import * as AudioPlayerLogic from "../modules/audio-player/models"

export default function (catalogPlugin, audioPlayerPlugin) {

  /**
   * @type {Archive.AsyncCatalog}
   */
  let catalog = catalogPlugin.mainCatalog

  const ToAudioPlayerLogic = Object.freeze({
    /**
     * 
     * @param {Archive.Album} album 
     */
    async asyncConvertAlbum(album) {
      if (!album) return null
      let aplAlbum = new AudioPlayerLogic.Album(
        album.id,
        album.title,
        album.coverArtUrl
      )
      return aplAlbum
    },
    /**
     * 
     * @param {Archive.Server} author 
     */
    async asyncConvertAuthor(author) {
      if (!author) return null
      let aplAuthor = new AudioPlayerLogic.Author(
        author.id,
        author.name
      )
      return aplAuthor
    },
    /**
     * 
     * @param {Archive.Track} track
     * @param {AudioPlayerLogic.Album|Archive.Album|null} [album]
     * @param {AudioPlayerLogic.Author|Archive.Server|null} [author]
     */
    async asyncConvertTrack(track, album, author) {
      if (!track) return null

      let authorId = null
      if (!album && track.albumId) {
        album = await catalog.asyncGetAlbumById(track.albumId)
        authorId = album.author
      } 
      if (album instanceof Archive.Album) {
        album = await ToAudioPlayerLogic.asyncConvertAlbum(album)
      }

      if (!author && authorId) {
        author = await catalog.asyncGetServerById(authorId)
      }
      if (author instanceof Archive.Server) {
        author = await ToAudioPlayerLogic.asyncConvertAuthor(author)
      }

      let aplTrack = new AudioPlayerLogic.Track(
        track.id,
        track.title,
        track.trackUrl,
        album,
        author
      )
  
      return aplTrack
    }
  })
  
  catalogPlugin.addActionToTrackListItem(
    {
      icon: { klass: "fa-solid fa-circle-play"},
      /**
       * 
       * @param {Archive.Track} track 
       * @param {number} index 
       */
      fnc: async (track, index) => {
        
        let audioPlayer = audioPlayerPlugin.mainAudioPlayer
        let aplTrack = await ToAudioPlayerLogic.asyncConvertTrack(track)


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