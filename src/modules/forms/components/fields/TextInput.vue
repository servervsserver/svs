<template>
  <div class="field">
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
    <div
      class="control"
      :class="{ 'has-icons-left': !!icon }"
    >
      <input
        :value="value"
        class="input"
        type="text"
        :placeholder="placeholder"
        @input="onChange($event)"
      >
      <span
        v-if="icon"
        class="icon is-small is-left"
      >
        <i :class="icon" />
      </span>
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
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    }
  },
  data: function() {
    return {}
  },
  mounted() {
    this.updateValidation(this.value)
  },

  methods: {
    onChange(event) {
      this.updateValidation(event.target.value)
      this.$emit('change', event.target.value)
    }
  }
}
</script>
