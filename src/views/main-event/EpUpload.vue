<template>
  <not-open-yet
    :message="'EP Submissions opens in'"
    :time="$store.getters.timeTillEpSubmission"
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
      <ep-upload-form
        :ep="ep"
        @validation-change="onEpValidationChange"
      />
      <button
        class="button"
        :disabled="!canSubmit"
        @click="submit"
      >
        <span class="icon">
          <i class="fas fa-paper-plane" />
        </span>
        <span>Submit</span>
      </button>
    </div>
    <modal ref="submitmodal" :open="true">
      <template v-slot:header>
        <strong v-if="isIdle">Nothing...</strong>
        <strong v-if="isCheckingValidity">Checking submission validity...</strong>
        <strong v-if="isReportingErrors">You can't submit this EP because</strong>
        <strong v-if="isSending">EP Submission can't finish because</strong>
        <strong v-if="isReportingSendingErrors">Bad things happened during the submission...</strong>
        <strong v-if="isSent">EP submitted!</strong>
      </template>
      <template v-slot:default>
        <spinner v-if="isCheckingValidity"/>
        <spinner v-if="isSending"/>
        <div v-if="isReportingErrors">
          <ul>
            <li
              v-for="(m,i) of modalSubmissionErrorMessages"
              :key="i"
            >
              {{ m }}
            </li>
          </ul>
        </div>
        <div v-if="isReportingSendingErrors">
          Try again to upload your EP and contact an admin.
        </div>
        <div v-if="isSent">
          Thank you for your submission!
        </div>
      </template>
    </modal>
  </not-open-yet>
</template>

<script>
import ModalComponent from "@/components/Modal.vue"
import Spinner from "@/components/Spinner.vue";

import {
  EpUploadFormComponent,
  Album,
  Track,
  CreditEntry
} from "@/components/forms/ep-upload"

import * as FirestoreModel from "@/plugins/backend/firestore"

import { getAudioFileDuration } from "@/models/file-manipulation/audio-file"
import { duration as durationFilter } from "@//filters/date.js"

const SUBMISSION_STATE = Object.freeze({
  IDLE: 0,
  VALIDITY_CHECK: 1,
  VALIDITY_ERRORS_REPORT: 2,
  SENDING: 3,
  SENDING_ERRORS: 4,
  SENT: 5
})

export default {
  components: {
    'modal': ModalComponent,
    'ep-upload-form': EpUploadFormComponent,
    'spinner': Spinner,
  },
  data() {
    return {
      ep: new Album(),
      modalSubmissionErrorMessages: [],
      canSubmit: true,
      submissionState: SUBMISSION_STATE.IDLE
    }
  },
  computed: {
    isIdle() {
      return this.submissionState == SUBMISSION_STATE.IDLE
    },
    isCheckingValidity() {
      return this.submissionState == SUBMISSION_STATE.VALIDITY_CHECK
    },
    isReportingErrors() {
      return this.submissionState == SUBMISSION_STATE.VALIDITY_ERRORS_REPORT
    },
    isSending() {
      return this.submissionState == SUBMISSION_STATE.SENDING
    },
    isReportingSendingErrors() {
      return this.submissionState == SUBMISSION_STATE.SENDING_ERRORS
    },
    isSent() {
      return this.submissionState == SUBMISSION_STATE.SENT
    },
    canShowSubmissionErrorModal() {
      return !!this.modalSubmissionErrorMessages.length
    }
  },
  mounted() {
    let ep = this.ep
    ep.infos.name = "EP Name"
    ep.infos.streamingLink = "stream.link"
    let track = new Track()
    track.name = "Yikes bumber 1"
    track.lyrics = "I've seen enough \n But I want to see more"
    track.hasLyrics = true
    track.genre = "Acid"
    let cred = new CreditEntry()
    cred.artistName = "Jiway"
    cred.description = "Jiw, ay"
    cred.discordTag = "Boomboclat#1234"
    track.credits.push(cred)
    ep.tracks.push(track)
    this.$refs.submitmodal.open()
  },
  methods: {
    onEpValidationChange(evt) {
      // this.canSubmit = evt
    },
    /**
     * Returns a promise that is true if it can be sumbitted
     */
    async computeSubmissionValidations() {
      this.submissionState = SUBMISSION_STATE.VALIDITY_CHECK
      let additionalMessages = []
      if (!this.ep.infos.name) {
        additionalMessages.push("You must provide a name for this EP")
      }
      if (this.ep.infos.name && this.ep.infos.name.length > 100) {
        additionalMessages.push(`You must provide a name with less than 100 chars for the EP.`)
      }
      if (!this.ep.infos.streamingLink) {
        additionalMessages.push("You must provide a streaming link for the EP")
      }
      if (!this.ep.infos.coverArtFile) {
        additionalMessages.push("Your EP must have a cover art")
      }
      if (this.ep.tracks.length < 3) {
        additionalMessages.push("En EP must have at least 3 tracks")
      }

      for (let trackIndex in this.ep.tracks) {
        
        let prefix = `The track #${+trackIndex+1}`
        let track = this.ep.tracks[trackIndex]
        if (!track.name) {
          additionalMessages.push(`${prefix} must have a name`)
        }
        if (track.name && track.name.length > 100) {
          additionalMessages.push(`${prefix} must have a name with less than 100 chars.`)
        }
        if (!track.genre) {
          additionalMessages.push(`${prefix} must have a genre.`)
        }
        if (!track.audioFile) {
          additionalMessages.push(`${prefix} must have an audio file.`)
        }
        if (track.credits.length < 3) {
          additionalMessages.push(`${prefix} must have at least 3 credited people`)
        }
      }
      
      let durations = await Promise.all(this.ep.tracks.map(
        track => {
          if (!track.audioFile) {
            return new Promise((resolve) => resolve(0))
          }
          return getAudioFileDuration(track.audioFile)
        })
      )

      let epDuration = durations.reduce((pv, cv) => pv + cv, 0)
      
      if (epDuration < 60 * 10) {
        additionalMessages.push(`The EP is ${durationFilter(epDuration)} long, it should be at least 10 minutes long.`)
      }
      if (epDuration > 60 * 15) {
        additionalMessages.push(`The EP is ${durationFilter(epDuration)} long, it shouldn't exceed 15 minutes.`)
      }

      this.modalSubmissionErrorMessages = additionalMessages

      this.submissionState = SUBMISSION_STATE.VALIDITY_ERRORS_REPORT
      return (!this.modalSubmissionErrorMessages.length)
    },
    async submit() {

      this.$refs.submitmodal.open()

      if (!await this.computeSubmissionValidations()) {
        console.warn("Form not validated, cannot submit")
        return
      }

      this.submissionState = SUBMISSION_STATE.SENDING

      let ep = this.ep

      let sId             = null
      let fAlbum          = new FirestoreModel.Album()
      let fTracks         = []
      let fCredits        = []
      let caf             = null
      let tafs            = []

      // Album content
      let fEp             = new FirestoreModel.Album()
      fEp.name            = ep.infos.name
      fEp.streaminglink   = ep.infos.streamingLink
      caf                 = ep.infos.coverArtFile

      // Populate tracks content
      fTracks             = ep.tracks.map(
        track => {
          let fTrack      = new FirestoreModel.Track()
          fTrack.name     = track.name
          fTrack.lyrics   = track.hasLyrics ? track.lyrics : null
          fTrack.explicit = track.explicit
          fTrack.genres   = [track.genre]
          if (track.secondGenre) {
            fTrack.genres.push(track.secondGenre)
          }
          return fTrack
        }
      )

      tafs                = ep.tracks.map(track => track.audioFile)

      // Populate credits content
      for( let trackIdx in ep.tracks) {
        let track = ep.tracks[trackIdx]
        fCredits.push(track.credits.map(ce => {
          let fCredit         = new FirestoreModel.TrackCreditsEntry()
          fCredit.artist_name = ce.artistName
          fCredit.discord_tag = ce.discordTag
          fCredit.roles       = ce.description.split(",")
          fCredit.anonymous   = ce.anonymous
          return fCredit
        }))
      }
      try {
        this.submissionState = SUBMISSION_STATE.SENDING
        // await this.$svsBackend.submitFullAlbum(sId, fAlbum, fTracks, fCredits, caf, tafs)
        this.submissionState = SUBMISSION_STATE.SENT
      } catch(error) {
        console.error(error)
        this.submissionState = SUBMISSION_STATE.SENDING_ERRORS
      }

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
