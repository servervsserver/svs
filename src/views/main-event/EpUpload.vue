<template>
  <not-open-yet
    :message="'EP Submissions opens in'"
    :time="$store.state.svsMainEventInformations.competitionStart.timeRemaining"
  >
    <div class="container ep-upload">
      <h1>
        Submit your EP
      </h1>
      <div class="columns">
        <div class="column is-6">
          <p>
            Are you happy with what your server has produced and think it's ready to be submitted?
            Submit your server's EP by filling out this form!
            Only one submission is allowed per server. You cannot change your submission afterwards, so make sure everything meets your standards and our competition rules.
          </p>
        </div>
      </div>
      <ep-upload-form :ep="ep" />
    </div>
  </not-open-yet>
</template>

<script>

import {
  EpUploadFormComponent,
  Ep
} from "@/components/forms/ep-upload"

export default {
  components: {
    'ep-upload-form': EpUploadFormComponent
  },
  data() {
    return {
      ep: new Ep()
    }
  }
}
// import { v4 as generateUuid } from "uuid"
// import MusicGenres from "../../assets/music-genres.json"

// export class CreditEntry {
//
//   constructor() {
//     /**
//     * {string} uuid generated on instanciation to help vue identify objects
//     */
//     this._vueId = generateUuid()
//
//     /**
//     * {string} Artist name if applicable
//     */
//     this.artistName = ""
//
//     /**
//     * {string} Discord tag of the person
//     */
//     this.discordTag = ""
//
//     /**
//     * {string} Short description of what they did
//     */
//     this.description = ""
//
//     /**
//     * {boolean} If true, the person will be listed as anonymous publicly
//     */
//     this.anonymous = false
//   }
//
//   get vueId() {
//     return this._vueId
//   }
// }
//
// export class Track {
//
//   constructor() {
//     /**
//     * {string} uuid generated on instanciation to help vue identify objects
//     */
//     this._vueId = generateUuid()
//
//     /**
//     * {string} name of the track
//     */
//     this.name = ""
//
//     /**
//     * {File} track file
//     */
//     this.audioFile = null
//
//     /**
//     * {string} url to the track file
//     */
//     this.audioUrl = null
//
//     /**
//     * {string} lyrics of the track
//     */
//     this.lyrics = ""
//
//     /**
//     * {string} whether it has lyrics or not (do not send the lyrics if its false)
//     */
//     this.hasLyrics = false
//
//     /**
//     * {string} the music contains profanity and must be labeled Parental Advisory
//     */
//     this.explicit = false
//
//     /**
//     * {string} the genre of the track
//     */
//     this.genre = ""
//
//
//     this._credits = []
//   }
//
//   get vueId() {
//     return this._vueId
//   }
//
//   /**
//   * Gets the track filename
//   */
//   get audioFilename () {
//     if (!this.audioFile) return ""
//     return this.audioFile.name
//   }
//
//   /**
//   * {Array[CreditEntry]} Credits
//   */
//   get credits() {
//     return this._credits
//   }
//
//   /**
//   * Creates and add an entry to the credits
//   * @return The credits entry created
//   */
//   addCreditEntry () {
//     let creditEntry = new CreditEntry()
//     this._credits.push(creditEntry)
//     return creditEntry
//   }
//
//   /**
//   * Removes a credit entry
//   */
//   removeCreditEntry (creditEntry) {
//     let idx = this._credits.indexOf(creditEntry)
//     if (idx == -1) return null
//     this._credits.splice(idx, 1)
//     return creditEntry
//   }
//
// }
//
// let testTrack = null
// let testTracks = []

// testTrack = new Track()
// testTrack.name = "My insane first track"
// testTrack.lyrics = "I saw pollen at a grocery store in Ohio yesterday. \n I told her how cool it was to meet her in person,  \n but I didn’t want to be a douche and bother her and ask her for photos or anything.  \n\n She said, \n “Oh, like you’re doing now?” \n \nI was taken aback, and all I could say was  \n“Huh?” but she kept cutting me off and going  \n“huh? huh? huh?”  \nand closing her hand shut in f ront of my face. "
// testTrack.hasLyrics = true
// testTrack.addCreditEntry()
// testTrack.addCreditEntry()
// testTrack.addCreditEntry()
// testTracks.push(testTrack)


// export default {
//   data: function () {
//     return {
//       epName: "",
//       coverArtUrl: /*"/placeholders/ep_cover_art_placeholder_icon.jpg"*/"",
//       coverArtFile: null,
//       epStreamingLink: "",
//       tracks: testTracks
//     }
//   },
//   computed: {
//     coverArtFilename () {
//       if (!this.coverArtFile) return "..."
//       return this.coverArtFile.name
//     },
//     musicGenres () {
//       return MusicGenres.sort()
//     }
//   },
//   methods: {
//     onCoverArtChange (evt) {
//       let input = evt.target
//       const [file] = input.files
//       this.coverArtFile = file
//       this.coverArtUrl = URL.createObjectURL(file)
//     },
//     onTrackFileChange (evt, track) {
//       let input = evt.target
//       const [file] = input.files
//       track.audioFile = file
//       track.audioUrl = URL.createObjectURL(file)
//     },
//     addTrack() {
//       let track = new Track()
//       // Prefil with 3 credits entry
//       track.addCreditEntry()
//       track.addCreditEntry()
//       track.addCreditEntry()
//       this.tracks.push(track)
//       return track
//     },
//     dropTrack(track) {
//       let index = this.tracks.indexOf(track)
//       if (index == -1) return null
//       this.tracks.splice(index, 1)
//       return track
//     }
//   }
// }

</script>

<style scoped lang='scss'>

.container {
  width: 100%;
}

.textarea.lyrics {
  transition: 0.25s all;
  height: 18em;
  resize: none;

  min-height: 4em;

  &.no-lyrics {
    height: 4em;
    opacity: 0.5;
    /* filter: blur(2px); */
  }
}

.track-section {
  position: relative;
  background-color: #fff1;
  border-radius: 5px;
  margin: 20px 5px;
}

.delete-track-button {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
}

.credit-index {
  color: inherit;
  background-color: transparent;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.15s all;
  border: none;
  transform: scale(1);
  padding: calc(0.5em  - 1px) 1em;
  text-align: center;
  white-space: nowrap;
  justify-content: center;
  vertical-align: baseline;
  line-height: 2.2em;
}

@media(min-width: 768px) {
  .has-text-right-on-desktop {
    text-align: right;
  }
  .has-text-left-on-desktop {
    text-align: left;
  }
}
@media(max-width: 768px) {
  .has-text-centered-on-mobile {
    text-align: center;
  }
}
</style>
