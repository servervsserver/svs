import AlbumInfos from "./album-infos.js"
import { Track } from "@/components/forms/track-upload"

export default class Album {
  
  constructor() {
    this.infos = new AlbumInfos()
    this.tracks = []
  }

  addTrack() {
    let track = new Track()
    this.tracks.push(track)
    return track
  }

  removeTrack(track) {
    let index = this.tracks.indexOf(track)
    if (index == -1) return null
    this.tracks.splice(index, 1)
    return track
  }
}
