<template>
  <section>
    <h2>EP Information</h2>
    <ep-infos-form :ep-infos="ep.infos" />
    <h2>Tracks</h2>
    <div
      v-for="(track, index) in ep.tracks"
      :key="track.vueId"
      class="track-section shadow-depth-2"
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
      <track-upload-form
        :track="track"
      />
    </div>
    <div class="track-section">
      <button
        class="button is-medium "
        @click="addTrack"
      >
        <span class="icon"><i class="fas fa-headphones" /></span>
        <span>Add track</span>
      </button>
    </div>
  </section>
</template>

<script>

import EpInfosFormComponent from "./EpInfosForm.vue"
import Ep from "./ep.js"

import {
  TrackUploadFormComponent,
  Track,
  CreditEntry
} from "@/components/forms/track-upload"

export default {
  components: {
    'ep-infos-form': EpInfosFormComponent,
    'track-upload-form': TrackUploadFormComponent
  },
  props: {
    ep: {
      type: Ep,
      required: true
    }
  },
  // data() {
  //   return {
  //     ep: new Ep()
  //   }
  // },
  methods: {
    addTrack() {
      return this.ep.addTrack()
    },
    dropTrack(track) {
      return this.ep.removeTrack(track)
    }
  }
}
</script>

<style scoped lang='scss'>
.track-section {
  position: relative;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  background: #fff1;
}

.delete-track-button {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
}
</style>
