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
      <div class="select">
        <select
          :value="value"
          class="transparent-scrollbar"
          @change="$emit('change', $event.target.value)"
        >
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
    options: {
      type: Array,
      default: () => []
    }
  },
  data: function() {
    return {}
  }
}
</script>
