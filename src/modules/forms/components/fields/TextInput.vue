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
        :value="text"
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
  ValidatorWithMessage
} from "@/modules/cdk/validators"

export default {
  model: {
    prop: 'text',
    event: 'change'
  },
  props: {
    text: {
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
    },
    validators: {
      type: Array,
      default: () => []
    }
  },
  data: function() {
    return {
      validatorEvaluation: null
    }
  },
  mounted() {
    this.updateValidation(this.text)
  },
  methods: {
    updateValidation(value) {
      let prevEval = this.validatorEvaluation
      let currentEval = ValidatorWithMessage.evaluateAll(this.validators, value)

      let hasChanged = prevEval === null || prevEval === undefined || (prevEval.validated != currentEval.validated)
      this.validatorEvaluation = currentEval

      if (hasChanged) {
        this.$emit('validationChange', currentEval.validated)
      }
    },
    onChange(event) {
      this.updateValidation(event.target.value)
      this.$emit('change', event.target.value)
    }
  }
}
</script>
