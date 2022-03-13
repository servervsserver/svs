<template>
  <section class="track-upload-form">
    {{ track.name }}
    <div class="columns is-multiline">
      <div class="column is-7">
        <!-- Track name -->
        <text-input
          v-model="track.name"
          :label="'Track title'"
          :placeholder="'My awesome track name'"
          :icon="'fas fa-play'"
        />
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
        <audio-file-input
          v-model="track.audioFile"
          :label="'Track audio file'"
        />
        <br/>
        <div class="columns is-vcentered">
          <!-- Music genre -->
          <div class="column is-4 is-mobile has-text-right-on-desktop has-text-centered-on-mobile">
            <label>Music genre</label>
          </div>
          <div class="column is-8 is-mobile has-text-left-on-desktop has-text-centered-on-mobile">
            <select-input
              v-model="track.genre"
              :icon="'fas fa-music'"
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
              v-model='track.explicit'
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
                v-model='track.hasLyrics'
              />
            </div>
          </div>
        </div>
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
            <text-input
              v-model="ce.artistName"
              :label="'Artist name'"
              :placeholder="'The artist'"
              :icon="'fas fa-user'"
            />
          </div>
          <!-- Discord tag -->
          <div class="column is-3">
            <text-input
              v-model="ce.discordTag"
              :label="'Discord tag'"
              :placeholder="'TheArtist#1234'"
              :icon="'fab fa-discord'"
            />
          </div>
          <!-- Role(s) -->
          <div class="column is-3">
            <text-input
              v-model="ce.description"
              :label="'Role(s)'"
              :placeholder="'Mixing, mastering, bass'"
              :icon="'fas fa-user-tag'"
            />
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
                  If this person doesn't want to appear in the credits, toggle this on.
                </template>
                <span class="icon is-small is-left">
                  <i class="fas fa-info-circle" />
                </span>
              </tooltip>
            </label>
            <switch-input
              v-model="ce.anonymous"
            />
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
</template>

<script>
import {
  TextInput,
  AudioFileInput,
  SelectInput,
  SwitchInput
} from "@/components/forms/fields"

import Track from "./track.js"
import CreditEntry from "./credits.js"

import MusicGenres from "@/assets/music-genres.json"

export default {
  components: {
    'text-input': TextInput,
    'audio-file-input': AudioFileInput,
    'switch-input': SwitchInput,
    'select-input': SelectInput
  },
  props: {
    track: {
      type: Track,
      default: () => new Track()
    }
  },
  mounted() {
    // console.log(this)
  },
  computed: {
    musicGenres () {
      return MusicGenres.sort()
    }
  },
  data: function() {
    return {
    }
  }
}
</script>

<style scoped lang='scss'>
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
</style>
