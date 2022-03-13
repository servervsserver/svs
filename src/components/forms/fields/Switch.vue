<template>
  <div class="field">
    <input
      :id="id"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
      type="checkbox"
      name="ce-anonymous"
      class="switch is-rounded"
    >
    <label :for="id" />
  </div>
</template>

<script>
import { v4 as generateUuid } from "uuid"
export default {
  props: {
    checked: Boolean
  },
  model: {
    prop: 'checked',
    event: 'change'
  },
  data() {
    return {
      id: generateUuid()
    }
  }
}
</script>
