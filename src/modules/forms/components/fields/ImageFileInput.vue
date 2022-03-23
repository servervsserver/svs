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
          <span class="file-name">
            {{ fileName }}
          </span>
        </label>
      </div>
    </div>
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
    value: File,
    label: {
      type: String,
      default: null
    }
  },
  computed: {
    fileName() {
      if (!this.value) return ""
      return this.value.name
    }
  },
  mounted() {
    this.updateValidation(this.value)
  },
  methods: {
    onFileChange(evt) {
      let input = evt.target
      const [file] = input.files
      this.updateValidation(file)
      this.$emit('change', file)
    }
  }
}
</script>
