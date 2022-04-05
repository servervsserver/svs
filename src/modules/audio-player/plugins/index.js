import * as AudioPlayer from "../models"
import AudioPlayerComponent from "../components/AudioPlayer"

export default class AudioPlayerPlugin {

  constructor(Vue) {

    Vue.component('audio-player', AudioPlayerComponent)

    /**
     * @type {AudioPlayer.AudioPlayer} AudioPlayer
     */
    this._player = null

  }

  set mainAudioPlayer(player) {
    if (this._player) {
      console.warn("There is already a main audio player that is bound to this plugin")
      return
    }
    this._player = player
  }

  get mainAudioPlayer() {
    return this._player
  }

  // get player() {
  //   if (!this._player) {
  //     this._player = new AudioPlayer.AudioPlayer()
  //   }
  //   return this._player
  // }

  static install(Vue, options) {
    Vue.prototype.$svsAudioPlayer = new AudioPlayerPlugin(Vue)
  }

}