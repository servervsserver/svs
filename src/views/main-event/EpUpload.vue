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
      <button class="button" :disabled="!canSubmit" @click="submit">
        <span class="icon">
          <i class="fas fa-paper-plane"></i>
        </span>
        <span>Submit</span>
      </button>
    </div>
    <modal ref="submitmodal">
      <template v-slot:header>
        <strong>EP Submission can't finish because</strong>
      </template>
      <template v-slot:default>
        <ul>
        <li v-for="(m,i) of modalSubmissionErrorMessages" :key="i">
          {{m}}
        </li>
        </ul>
      </template>
    </modal>
  </not-open-yet>
</template>

<script>
import ModalComponent from "@/components/Modal.vue"

import {
  EpUploadFormComponent,
  Ep
} from "@/components/forms/ep-upload"

export default {
  components: {
    'modal': ModalComponent,
    'ep-upload-form': EpUploadFormComponent
  },
  data() {
    return {
      ep: new Ep(),
      modalSubmissionErrorMessages: [],
      canSubmit: false
    }
  },
  computed: {
    canShowSubmissionErrorModal() {
      return !!this.modalSubmissionErrorMessages.length
    }
  },
  methods: {
    onEpValidationChange(evt) {
      this.canSubmit = evt
    },
    submit() {
      let additionalMessages = []
      if (this.ep.tracks.length < 3) {
        additionalMessages.push("En EP must have at least 3 tracks")
      }
      for (let trackIndex in this.ep.tracks) {
        console.log(trackIndex, this.ep.tracks)
        let track = this.ep.tracks[trackIndex]
        if (track.credits.length < 3) {
          additionalMessages.push(`The track #${+trackIndex+1} must have at least 3 credited people`)
        }
      }
      this.modalSubmissionErrorMessages = additionalMessages
      if (this.modalSubmissionErrorMessages.length) {
        this.$refs.submitmodal.open()
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
