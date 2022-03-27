<template>
  <section class="track-upload-form">
    <p v-if="!isFormValidated" class="help is-danger">
      This track form has invalid fields.
    </p>
    <p v-if="isFormValidated" class="help is-danger">
      &nbsp;
    </p>
    <div class="columns is-multiline">
      <div class="column is-7">
        <!-- Track name -->
        <text-input
          v-model="track.name"
          :label="'Track title'"
          :placeholder="'My awesome track name'"
          :icon="'fas fa-play'"
          :validators="titleValidators"
          @validation-change="onTitleValidationChange"
        />
        <!-- Lyrics -->
        <textarea-input
          v-model="track.lyrics"
          :label="'Lyrics'"
          :disabled="!track.hasLyrics"
        />
      </div>
      <div class="column is-5">
        <!-- Audio file -->
        <audio-file-input
          v-model="track.audioFile"
          :label="'Track audio file'"
        />
        <br>
        <div class="columns is-vcentered">
          <!-- Music genre -->
          <div class="column is-4 is-mobile has-text-right-on-desktop has-text-centered-on-mobile">
            <label>Music genre(s)</label>
          </div>
          <div class="column is-8 is-mobile has-text-left-on-desktop has-text-centered-on-mobile">
            <select-input
              v-model="track.genre"
              :label="'Main genre'"
              :icon="'fas fa-music'"
              :options="musicGenres"              
              :validators="genreValidators"
              @validation-change="onMainGenreValidationChange"
            />
            <select-input
              v-model="track.secondGenre"
              :label="'Second genre'"
              :icon="'fas fa-music'"
              :unselectedText="'-'"
              :options="musicGenres"
            />
          </div>
        </div>
        <div class="columns is-vcentered">
          <!-- Parental Advisory -->
          <div class="column is-4 is-mobile has-text-right-on-desktop has-text-centered-on-mobile">
            <label>
              Explicit?
              <tooltip
                :vertical="'top'"
                :mode="'hover'"
              >
                <template v-slot:message>
                  Your track is explicit if your lyrics contains words or expressions that could fall under the
                  <strong>Parental&nbsp;Advisory&nbsp;Label&nbsp;</strong>
                  <em>(PAL)</em><br>
                  (Violence, sex, drugs, ect.). If this is the case, toggle this on.
                </template>
                <span class="icon is-small is-left">
                  <i class="fas fa-info-circle" />
                </span>
              </tooltip>
            </label>
          </div>
          <div class="column is-8 is-mobile has-text-left-on-desktop has-text-centered-on-mobile">
            <switch-input
              v-model="track.explicit"
            />
          </div>
        </div>
        <div class="columns is-vcentered">
          <!-- Instrumental or vocal -->
          <div class="column is-4 is-mobile has-text-right-on-desktop has-text-centered-on-mobile">
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
          <div class="column is-8 is-mobile has-text-left-on-desktop has-text-centered-on-mobile">
            <div class="field">
              <switch-input
                v-model="track.hasLyrics"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="column is-12">
        <!-- Credits -->
        <label>Credits</label>
        <credits-form
          v-for="(ce, ceidx) in track.credits"
          :key="ce.vueId"
          :credits="ce"
          @validation-change="onCreditsValidationChange($event, ce.vueId)"
        >
          <template v-slot:left>
            <br>
            <span class="credit-index">{{ ceidx + 1 }}</span>
            <button
              class="button svs-button-transparent"
              @click="removeCreditEntry(ce, ce.vueId)"
            >
              <span class="icon is-small">
                <i class="fas fa-user-minus" />
              </span>
            </button>
          </template>
        </credits-form>
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
</template>

<script>
import {
  TextInputComponent,
  AudioFileInputComponent,
  SelectInputComponent,
  SwitchInputComponent,
  TextAreaInputComponent
} from "@/modules/forms"

import CreditsFormComponent from "./CreditsForm.vue"

import {
  FormValidationMixin
} from "@/modules/forms/mixins/form-validation.mixin"

import {
  ValidatorWithMessage
} from "@/modules/cdk/validators"

import Track from "./track.js"

import MusicGenres from "@/assets/music-genres.json"

export default {
  components: {
    'text-input': TextInputComponent,
    'switch-input': SwitchInputComponent,
    'audio-file-input': AudioFileInputComponent,
    'select-input': SelectInputComponent,
    'textarea-input': TextAreaInputComponent,
    'credits-form': CreditsFormComponent
  },
  mixins: [
    FormValidationMixin.forValidators(['title', 'main genre'], ['Credits'])
  ],
  props: {
    track: {
      type: Track,
      default: () => new Track()
    }
  },
  data: function() {
    return {
      titleValidators: [
        ValidatorWithMessage.required(),
        ValidatorWithMessage.maxCharCount(100)
      ],
      genreValidators: [
        ValidatorWithMessage.required()
      ]
    }
  },
  computed: {
    musicGenres () {
      let sorted = MusicGenres.sort()
      return sorted
    }
  },
  mounted() {
    this.onValidationChange()
  },
  methods: {
    removeCreditEntry(creditEntry, index) {
      this.track.removeCreditEntry(creditEntry)
      this.onCreditsValidationDeleted(index)
    }
    // onCreditValidationChange(event, index) {
    //   console.log("HEYA")
    //   console.log(event, index)
    // }
  }
}
</script>

<style scoped lang='scss'>
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

.track-upload-form {
  width: 100%;
  position: relative;

}
</style>
