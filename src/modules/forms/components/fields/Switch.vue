<template>
  <div class="field">
    <input
      :id="id"
      :checked="value"
      type="checkbox"
      name="ce-anonymous"
      class="switch is-rounded"
      @change="onChange"
    >
    <label :for="id" />
  </div>
</template>

<script>
import { v4 as generateUuid } from "uuid"
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
    value: Boolean
  },
  mounted() {
    this.updateValidation(this.value)
  },
  data() {
    return {
      id: generateUuid()
    }
  },
  methods: {
    onChange(event) {
      this.updateValidation(event.target.checked)
      this.$emit('change', event.target.checked)
    }
  }
}
</script>
