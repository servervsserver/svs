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
        @change="$emit('change', $event.target.value)"
        class="input"
        type="text"
        :placeholder="placeholder"
      >
      <span
        v-if="icon"
        class="icon is-small is-left"
      >
        <i :class="icon" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'text',
    event: 'change'
  },
  props: {
    text: {
      type: String
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
  }
}
</script>
