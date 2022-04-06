<template>
  <section class="ep-upload-form">
    <div class="columns">
      <div class="column is-5">
        <text-input
          v-model="albumInfos.name"
          :label="'Title'"
          :placeholder="'The name of my awesome EP'"
          :icon="'fas fa-compact-disc'"
          :validators="titleValidators"
          @validation-change="onTitleValidationChange"
        />
        <image-file-input
          v-model="coverArtFile"
          :label="'Cover art file'"
          :validators="coverArtValidators"
          @validation-change="onCoverArtValidationChange"
        >
          <template v-slot:tooltip>
            The cover art should be square, preferably 3000x3000 pixels. <br> The same standard used by distribution platforms.
          </template>
        </image-file-input>
        <text-input
          v-model="albumInfos.streamingLink"
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
            :src="coverArtUrl"
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

import {
  FormValidationMixin
} from "@/modules/forms/mixins/form-validation.mixin"

import AlbumInfos from "./album-infos.js"

export default {
  components: {
    'text-input': TextInputComponent,
    'image-file-input': ImageFileInputComponent
  },
  mixins: [
    FormValidationMixin.forValidators(['title', 'stream-Link', 'cover art'])
  ],
  props: {
    albumInfos: {
      type: AlbumInfos,
      default: () => { new AlbumInfos(); console.warn("creation")}
    },
  },
  data() {
    return {
      titleValidators: [
        ValidatorWithMessage.required(),
        ValidatorWithMessage.maxCharCount(100)
      ],
      streamLinkValidators: [
        ValidatorWithMessage.url()
      ],
      coverArtValidators: [
        ValidatorWithMessage.required()
      ],
      coverArtUrl: ""
    }
  },
  computed: {
    coverArtFile: {
      get: function() {
        return this.albumInfos.coverArtFile
      },
      set: function(newVal) {
        this.albumInfos.coverArtFile = newVal
        this.coverArtUrl = this.albumInfos.coverArtUrl = newVal ? URL.createObjectURL(newVal) : ""
      }
    }
  },
  mounted() {
    this.onValidationChange()
  },
  methods: {
  }
}
</script>
