<template>
  <div class="field has-text-centered-on-mobile">
    <label>
      {{ label }}
      <tooltip
        :vertical="'top'"
        :mode="'hover'"
      >
        <template v-slot:message>
          The audio file should be a 320kbps mp3.<br>
          Aim for -14 integrated LUFS for mastering.
        </template>
        <span class="icon is-small is-left">
          <i class="fas fa-info-circle" />
        </span>
      </tooltip>
    </label>

    <div class="file has-name">
      <label class="file-label">
        <input
          accept=".mp3"
          class="file-input"
          type="file"
          @change="onFileChange($event)"
        >
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-file-audio" />
          </span>
          <span
            v-if="!fileName"
            class="file-label">
            Choose a file…
          </span>
          <span
            v-if="fileName"
            class="file-name">
            {{ fileName }}
          </span>
        </span>
      </label>
    </div>
    <div
      v-if="showMetaData"
      class="audio-file-meta-data"
    >
    <progress
      v-if="isLoadingMetaData"
      class="progress is-small" max="100">
    </progress>
      <span
        v-if="isLoadedMetaData"
      >Duration: {{ duration | duration }}</span>
    </div>
  </div>
</template>

<script>

import { getAudioFileDuration } from "@/models/file-manipulation/audio-file"

const MetaDataState = Object.freeze({
  NONE: 0,
  LOADING: 1,
  LOADED: 2
})

export default {
  props: {
    file: File,
    label: {
      type: String,
      default: null
    },
    showMetaData: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    fileName() {
      if (!this.file) return ""
      return this.file.name
    },
    isLoadingMetaData() {
      return this.metaDataState == MetaDataState.LOADING
    },
    isLoadedMetaData() {
      return this.metaDataState == MetaDataState.LOADED
    }
  },
  model: {
    prop: 'file',
    event: 'change'
  },
  methods: {
    onFileChange(evt) {
      let input = evt.target
      const [file] = input.files
      this.$emit('change', file)
      this.metaDataState = MetaDataState.LOADING
      getAudioFileDuration(file)
        .then(res => {
          this.duration = res
          this.metaDataState = MetaDataState.LOADED
        })
        .catch(err => {
          this.metaDataState = MetaDataState.NONE
          this.duration = null
        })
    }
  },
  data: function() {
    return {
      metaDataState: MetaDataState.NONE,
      duration: null
    }
  }
}
</script>

<style scoped lang='scss'>
.audio-file-meta-data {
  padding-top: 0.5em;
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
