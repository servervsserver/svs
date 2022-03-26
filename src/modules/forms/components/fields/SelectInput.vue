<template>
  <div class="field">
    <label v-if="label">
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
    <div class="control has-icons-left">
      <div 
        class="select" 
        :class="{ 'is-danger': !isValidated }"
      >
        <select
          :value="value"
          class="transparent-scrollbar"
          @change="onChange"
        >
          <option
            v-if="unselectedText"
            value=""
            style="display: block;"
          >
            {{ unselectedText }}
          </option>
          <option
            v-for="option in options"
            :key="option"
          >
            {{ option }}
          </option>
        </select>
        <span
          v-if="icon"
          class="icon is-small is-left"
        >
          <i :class="icon" />
        </span>
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
    unselectedText: {
      type: [String, null],
      default: null
    },
    options: {
      type: Array,
      default: () => []
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
