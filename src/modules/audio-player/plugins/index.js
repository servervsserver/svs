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

  get player() {
    if (!this._player) {
      this._player = new AudioPlayer.AudioPlayer()
    }
    return this._player
  }

  static install(Vue, options) {
    Vue.prototype.$svsAudioPlayer = new AudioPlayerPlugin(Vue)
  }

}