<template>
  <div class="field">
    <input
      :id="id"
      :checked="checked"
      type="checkbox"
      name="ce-anonymous"
      class="switch is-rounded"
      @change="$emit('change', $event.target.checked)"
    >
    <label :for="id" />
  </div>
</template>

<script>
import { v4 as generateUuid } from "uuid"
export default {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  data() {
    return {
      id: generateUuid()
    }
  }
}
</script>
