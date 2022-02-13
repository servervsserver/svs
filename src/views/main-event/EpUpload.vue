<template>
  <div class="container ep-upload">
    <h1>
      Submit your EP
    </h1>
    <p>
      You are happy with what your server has produced and think it's ready to submit?<br>
      Submit your server's EP by filling out this form! <br>
      Only one submission per server allowed. You cannot change your submission afterwards, so make sure everything meets your standards and our competition rules.
    </p>

    <div>
      <div class="form">
        <!-- EP info start -->

        <h2>EP Information</h2>

        <div class="columns">
          <div class="column is-5">
            <div class="field">
              <label>Name of the EP</label>
              <div class="control has-icons-left">
                <input
                  v-model="epName"
                  class="input"
                  type="text"
                  placeholder="My awesome server EP"
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-compact-disc" />
                </span>
              </div>
            </div>
            <!-- Cover art form  -->
            <div class="field ">
              <label>
                EP Cover Art
                <tooltip
                  :vertical="'top'"
                  :mode="'hover'"
                >
                  <template v-slot:message>
                    The cover art should be square, preferably 3000x3000 pixels— the same standard used by distribution platforms.
                  </template>
                  <span class="icon is-small is-left">
                    <i class="fas fa-info-circle" />
                  </span>
                </tooltip>
              </label>
              <div class="has-text-centered">
                <div class="file has-name is-boxed">
                  <label class="file-label">
                    <input
                      accept="image/*"
                      class="file-input"
                      type="file"
                      @change="onCoverArtChange"
                    >
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload" />
                      </span>
                      <span class="file-label">
                        Choose a file…
                      </span>
                    </span>
                    <span class="file-name">
                      {{ coverArtFilename }}
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <!-- Streaming link -->
            <div class="field">
              <label>
                Public streaming link
                <tooltip
                  :vertical="'top'"
                  :mode="'hover'"
                >
                  <template v-slot:message>
                    A link where people can listen to your EP<br>
                    (Youtube, Soundcloud, etc.)
                  </template>
                  <span class="icon is-small is-left">
                    <i class="fas fa-info-circle" />
                  </span>
                </tooltip>
              </label>
              <div class="control has-icons-left">
                <input
                  v-model="epStreamingLink"
                  class="input"
                  type="text"
                  placeholder="https://soundcloud.com/my-server/my-awesome-ep-link"
                >
                <span class="icon is-small is-left"><i class="fas fa-link" /></span>
              </div>
            </div>
          </div>

          <div class="column is-offset-2 is-5">
            <squared-image-box style="max-width: 300px">
              <img
                ref="serverIconEl"
                class="shadow-depth-2"
                :src="coverArtUrl"
              >
            </squared-image-box>
            <!-- <img
              :src="coverArtUrl"
              width="100%"
              class="shadow-depth-2"
            > -->
          </div>
        </div>

        <!-- EP info end -->
        <!-- Track info start -->

        <h2>Tracks</h2>

        <div class="columns is-multiline">
          <section
            v-for="(track, index) in tracks"
            :key="track.vueId"
            class="column is-full track-section shadow-depth-2 gradient-bg"
          >
            <button
              class="button svs-button-transparent delete-track-button"
              @click="dropTrack(track)"
            >
              <span class="icon">
                <i class="fas fa-trash-alt" />
              </span>
            </button>
            <h3>
              Track {{ index + 1 }}
            </h3>
            <div class="columns is-multiline">
              <div class="column is-7">
                <!-- Track name -->
                <div
                  class="field"
                >
                  <label>Name of the track</label>
                  <div class="control has-icons-left">
                    <input
                      v-model="track.name"
                      class="input"
                      type="text"
                      :placeholder="'My awesome track #' + (index + 1)"
                    >
                    <span class="icon is-small is-left"><i class="fas fa-play" /></span>
                  </div>
                </div>
                <!-- Lyrics -->
                <div
                  class="field"
                >
                  <label>Lyrics</label>
                  <textarea
                    v-model="track.lyrics"
                    class="textarea lyrics"
                    :class="{ 'no-lyrics': !track.hasLyrics }"
                    :disabled="!track.hasLyrics"
                  />
                </div>
              </div>

              <div class="column is-5">
                <!-- Audio file -->
                <div class="field has-text-centered-on-mobile">
                  <label>
                    Audio file
                    <tooltip
                      :vertical="'top'"
                      :mode="'hover'"
                    >
                      <template v-slot:message>
                        The audio file should be an mp3, 320kbps.<br>
                        Aim for -14 integrated LUFS for mastering.
                      </template>
                      <span class="icon is-small is-left">
                        <i class="fas fa-info-circle" />
                      </span>
                    </tooltip>
                  </label>
                  <!-- <div class="has-text-centered"> -->
                  <div class="file has-name">
                    <label class="file-label">
                      <input
                        accept=".mp3"
                        class="file-input"
                        type="file"
                        @change="onTrackFileChange($event, track)"
                      >
                      <span class="file-cta">
                        <span class="file-icon">
                          <i class="fas fa-file-audio" />
                        </span>
                        <span class="file-label">
                          Choose a file…
                        </span>
                        <span class="file-name">
                          {{ track.audioFilename }}
                        </span>
                      </span>
                    </label>
                  </div>
                  <!-- </div> -->
                </div>

                <div class="columns is-vcentered">
                  <!-- Music genre -->
                  <div class="column is-half is-mobile has-text-right-on-desktop has-text-centered-on-mobile">
                    <label>Music genre</label>
                  </div>
                  <div class="column is-half is-mobile has-text-left-on-desktop has-text-centered-on-mobile">
                    <div class="control has-icons-left">
                      <div class="select">
                        <select v-model="track.genre">
                          <option
                            disabled
                            value=""
                          >
                            Unclassified
                          </option>
                          <option
                            v-for="genre in musicGenres"
                            :key="genre"
                          >
                            {{ genre }}
                          </option>
                          <!-- <option>With options</option> -->
                        </select>
                        <span class="icon is-left">
                          <i class="fas fa-music" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="columns is-vcentered">
                  <!-- Parental Advisory -->
                  <div class="column is-half is-mobile has-text-right-on-desktop has-text-centered-on-mobile">
                    <label>
                      Explicit?
                      <tooltip
                        :vertical="'top'"
                        :mode="'hover'"
                      >
                        <!-- <template v-slot:title>Yep'</template> -->
                        <template v-slot:message>
                          It is explicit if your lyrics contains words or expressions that could fall under the
                          <strong>Parental&nbsp;Advisory&nbsp;Label&nbsp;</strong>
                          <em>(PAL)</em><br>
                          (Violence, sexe, drugs,...)
                        </template>
                        <span class="icon is-small is-left">
                          <i class="fas fa-info-circle" />
                        </span>
                      </tooltip>
                    </label>
                  </div>
                  <div class="column is-half is-mobile has-text-left-on-desktop has-text-centered-on-mobile">
                    <div class="field">
                      <input
                        :id="'explicit-track-' + index"
                        v-model="track.explicit"
                        type="checkbox"
                        name="ce-anonymous"
                        class="switch is-rounded"
                      >
                      <label :for="'explicit-track-' + index" />
                    </div>
                  </div>
                </div>

                <div class="columns is-vcentered">
                  <!-- Instrumental or vocal -->
                  <div class="column is-half is-mobile has-text-right-on-desktop has-text-centered-on-mobile">
                    <label>
                      Has vocals?
                    </label>
                    <tooltip
                      :vertical="'top'"
                      :mode="'hover'"
                    >
                      <!-- <template v-slot:title>Yep'</template> -->
                      <template v-slot:message>
                        If your track has a vocal performance, toggle this on. <br>
                        Beatboxing is considered an instrument.
                      </template>
                      <span class="icon is-small is-left">
                        <i class="fas fa-info-circle" />
                      </span>
                    </tooltip>
                  </div>
                  <div class="column is-half is-mobile has-text-left-on-desktop has-text-centered-on-mobile">
                    <div class="field">
                      <input
                        :id="'lyrics-track-' + index"
                        v-model="track.hasLyrics"
                        type="checkbox"
                        name="ce-anonymous"
                        class="switch is-rounded"
                      >
                      <label :for="'lyrics-track-' + index" />
                    </div>
                  </div>
                </div>

                <!-- <div class="columns is-vcentered">
                  <div class="column is-half is-mobile has-text-right" />
                  <div class="column is-half is-mobile" />
                </div> -->
              </div>

              <div class="column is-12">
                <!-- Credits -->
                <label>Credits</label>
                <div
                  v-for="(ce, ceidx) in track.credits"
                  :key="ce.vueId"
                  class="columns is-vcentered"
                >
                  <div class="column is-narrow has-text-centered">
                    <span class="credit-index">{{ ceidx + 1 }}</span>
                    <!-- &nbsp; -->
                    <button
                      class="button svs-button-transparent"
                      @click="track.removeCreditEntry(ce)"
                    >
                      <span class="icon is-small">
                        <i class="fas fa-user-minus" />
                      </span>
                    </button>
                  </div>
                  <!-- Artist name -->
                  <div class="column is-3">
                    <div class="field">
                      <label>Artist name</label>
                      <div class="control has-icons-left">
                        <input
                          v-model="ce.artistName"
                          class="input"
                          type="text"
                          placeholder="The artist"
                        >
                        <span class="icon is-small is-left">
                          <i class="fas fa-user" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <!-- Discord tag -->
                  <div class="column is-3">
                    <div class="field">
                      <label>Discord tag</label>
                      <div class="control has-icons-left">
                        <input
                          v-model="ce.discordTag"
                          class="input"
                          type="text"
                          placeholder="TheArtist#0420"
                        >
                        <span class="icon is-small is-left">
                          <i class="fab fa-discord" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <!-- Role(s) -->
                  <div class="column is-3">
                    <div class="field">
                      <label>Role(s)</label>
                      <div class="control has-icons-left">
                        <input
                          v-model="ce.description"
                          class="input"
                          type="text"
                          placeholder="Mixing, mastering, bass"
                        >
                        <span class="icon is-small is-left">
                          <i class="fas fa-user-tag" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <!-- Anonymous -->
                  <div class="column">
                    <label>
                      Stay anonymous
                      <tooltip
                        :vertical="'top'"
                        :horizontal="'left'"
                        :mode="'hover'"
                      >
                        <!-- <template v-slot:title>Yep'</template> -->
                        <template v-slot:message>
                          If this person doesn't want to appear in the credits.
                        </template>
                        <span class="icon is-small is-left">
                          <i class="fas fa-info-circle" />
                        </span>
                      </tooltip>
                    </label>
                    <div class="field">
                      <input
                        :id="'ce-anonymous-track-' + index + '-ce-' + ceidx"
                        v-model="ce.anonymous"
                        type="checkbox"
                        name="ce-anonymous"
                        class="switch is-rounded"
                      >
                      <label :for="'ce-anonymous-track-' + index + '-ce-' + ceidx" />
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    class="button"
                    @click="track.addCreditEntry()"
                  >
                    <span class="icon is-small">
                      <i class="fas fa-user-plus" />
                    </span>
                    <span>Add credit</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section class="track-section has-text-centered">
            <button
              class="button is-medium "
              @click="addTrack"
            >
              <span class="icon"><i class="fas fa-headphones" /></span>
              <span>Add track</span>
            </button>
          </section>
        </div>

        <!-- Track info end -->
      </div>
    </div>
  </div>
</template>

<script>

import { v4 as generateUuid } from "uuid"
import MusicGenres from "../../assets/music-genres.json"

export class CreditEntry {

  constructor() {
    /**
    * {string} uuid generated on instanciation to help vue identify objects
    */
    this._vueId = generateUuid()

    /**
    * {string} Artist name if applicable
    */
    this.artistName = ""

    /**
    * {string} Discord tag of the person
    */
    this.discordTag = ""

    /**
    * {string} Short description of what they did
    */
    this.description = ""

    /**
    * {boolean} If true, the person will be listed as anonymous publicly
    */
    this.anonymous = false
  }

  get vueId() {
    return this._vueId
  }
}

export class Track {

  constructor() {
    /**
    * {string} uuid generated on instanciation to help vue identify objects
    */
    this._vueId = generateUuid()

    /**
    * {string} name of the track
    */
    this.name = ""

    /**
    * {File} track file
    */
    this.audioFile = null

    /**
    * {string} url to the track file
    */
    this.audioUrl = null

    /**
    * {string} lyrics of the track
    */
    this.lyrics = ""

    /**
    * {string} whether it has lyrics or not (do not send the lyrics if its false)
    */
    this.hasLyrics = false

    /**
    * {string} the music contains profanity and must be labeled Parental Advisory
    */
    this.explicit = false

    /**
    * {string} the genre of the track
    */
    this.genre = ""


    this._credits = []
  }

  get vueId() {
    return this._vueId
  }

  /**
  * Gets the track filename
  */
  get audioFilename () {
    if (!this.audioFile) return ""
    return this.audioFile.name
  }

  /**
  * {Array[CreditEntry]} Credits
  */
  get credits() {
    return this._credits
  }

  /**
  * Creates and add an entry to the credits
  * @return The credits entry created
  */
  addCreditEntry () {
    let creditEntry = new CreditEntry()
    this._credits.push(creditEntry)
    return creditEntry
  }

  /**
  * Removes a credit entry
  */
  removeCreditEntry (creditEntry) {
    let idx = this._credits.indexOf(creditEntry)
    if (idx == -1) return null
    this._credits.splice(idx, 1)
    return creditEntry
  }

}

let testTrack = null
let testTracks = []

// testTrack = new Track()
// testTrack.name = "My insane first track"
// testTrack.lyrics = "I saw pollen at a grocery store in Ohio yesterday. \n I told her how cool it was to meet her in person,  \n but I didn’t want to be a douche and bother her and ask her for photos or anything.  \n\n She said, \n “Oh, like you’re doing now?” \n \nI was taken aback, and all I could say was  \n“Huh?” but she kept cutting me off and going  \n“huh? huh? huh?”  \nand closing her hand shut in f ront of my face. "
// testTrack.hasLyrics = true
// testTrack.addCreditEntry()
// testTrack.addCreditEntry()
// testTrack.addCreditEntry()
// testTracks.push(testTrack)


export default {
  data: function () {
    return {
      epName: "",
      coverArtUrl: /*"/placeholders/ep_cover_art_placeholder_icon.jpg"*/"",
      coverArtFile: null,
      epStreamingLink: "",
      tracks: testTracks
    }
  },
  computed: {
    coverArtFilename () {
      if (!this.coverArtFile) return "..."
      return this.coverArtFile.name
    },
    musicGenres () {
      return MusicGenres.sort()
    }
  },
  methods: {
    onCoverArtChange (evt) {
      let input = evt.target
      const [file] = input.files
      this.coverArtFile = file
      this.coverArtUrl = URL.createObjectURL(file)
    },
    onTrackFileChange (evt, track) {
      let input = evt.target
      const [file] = input.files
      track.audioFile = file
      track.audioUrl = URL.createObjectURL(file)
    },
    addTrack() {
      let track = new Track()
      // Prefil with 3 credits entry
      track.addCreditEntry()
      track.addCreditEntry()
      track.addCreditEntry()
      this.tracks.push(track)
      return track
    },
    dropTrack(track) {
      let index = this.tracks.indexOf(track)
      if (index == -1) return null
      this.tracks.splice(index, 1)
      return track
    }
  }
}

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
