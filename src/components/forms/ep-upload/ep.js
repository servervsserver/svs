import EpInfos from "./ep-infos"
import { Track } from "@/components/forms/track-upload"

export default class Ep {
  constructor() {
    this.infos = new EpInfos()
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
