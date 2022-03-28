<template>
  <div class="field has-text-centered-on-mobile">
    <label>
      {{ label }}
      <tooltip
        v-if="$slots.tooltip"
        :vertical="'top'"
        :mode="'hover'"
      >
        <template v-slot:message>
          <slot name="tooltip" />
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
            @change="onFileChange($event)"
          >
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload" />
            </span>
            <span class="file-label">
              Choose a file…
            </span>
          </span>
          <span
            v-if="fileName"
            class="file-name"
          >
            <span>{{ fileName }}</span>
          </span>
        </label>
      </div>
    </div>
    <p
      v-if="validatorEvaluation"
      class="help is-danger"
    >
      <span
        v-for="(message,index) in validatorEvaluation.invalidMessages"
        :key="index"
        style="display: block;"
      >
        {{ message }}
      </span>
    </p>
  </div>
</template>

<script>
import {
  InputValidationMixin
} from "../../mixins/input-validation.mixin"

export default {
  mixins: [InputValidationMixin],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: File,
      default: null
    },
    label: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      fileName: "..."
    }
  },
  mounted() {
    this.updateValidation(this.value)
  },
  methods: {
    onFileChange(evt) {
      let input = evt.target
      const [file] = input.files
      this.fileName = file ? file.name : "..."
      this.$emit('change', file)
      this.updateValidation(file)
    }
  }
}
</script>

<style lang="scss" scoped>
  .file-name > span {
    font-size: 0.7em;
  }
</style>
