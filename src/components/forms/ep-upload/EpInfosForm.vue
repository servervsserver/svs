<template>
  <section class="ep-upload-form">
    <div class="columns">
      <div class="column is-5">
        <text-input
          v-model="epInfos.name"
          :label="'Title'"
          :placeholder="'The name of my awesome EP'"
          :icon="'fas fa-compact-disc'"
          :validators="titleValidators"
          @validation-change="onTitleValidationChange"
        />
        <image-file-input
          v-model="epInfos.covertArtFile"
          :label="'Cover art file'"
        >
          <template v-slot:tooltip>
            The cover art should be square, preferably 3000x3000 pixels. <br> The same standard used by distribution platforms.
          </template>
        </image-file-input>
        <text-input
          v-model="epInfos.streamingLink"
          :label="'Public streaming link'"
          :icon="'fas fa-link'"
          :placeholder="'https://soundcloud.com/my-server/my-awesome-ep-link'"
          :validators="streamLinkValidators"
          @validation-change="onStreamLinkValidationChange"
        >
          <template v-slot:tooltip>
            A link where people can listen to your EP<br>
            (Youtube, Soundcloud, etc.)
          </template>
        </text-input>
      </div>

      <div class="column is-offset-2 is-5">
        <squared-image-box style="max-width: 300px">
          <img
            ref="serverIconEl"
            class="shadow-depth-2"
            :src="epInfos.coverArtUrl"
          >
        </squared-image-box>
      </div>
    </div>
  </section>
</template>

<script>
import {
  TextInputComponent,
  ImageFileInputComponent
} from "@/modules/forms"

import {
  ValidatorWithMessage
} from "@/modules/cdk/validators"

import EpInfos from "./ep-infos.js"

export default {
  components: {
    'text-input': TextInputComponent,
    'image-file-input': ImageFileInputComponent
  },
  props: {
    epInfos: {
      type: EpInfos,
      default: () => new EpInfos()
    },
  },
  data() {
    return {
      titleValidators: [
        ValidatorWithMessage.minCharCount(1),
        ValidatorWithMessage.maxCharCount(100)
      ],
      streamLinkValidators: [
        ValidatorWithMessage.url()
      ],
      validations: {
        title: false,
        streamLink: false
      }
    }
  },
  emits: [
    'validation-change' // Emitted when the validation changes state
  ],
  methods: {
    onTitleValidationChange(evt) {
      this.validations.title = evt
      this.onValidationChange()
    },
    onStreamLinkValidationChange(evt) {
      this.validations.streamLink = evt
      this.onValidationChange()
    },
    onValidationChange: (function() {
      let lastState = false
      return function() {
        let valid = Object.values(this.validations)
          .reduce((agr, a) => agr && a, true)
        if (lastState == valid) return

        lastState = valid
        this.$emit("validation-change", valid)
      }
    })()
  }
}
</script>
