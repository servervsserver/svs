<template>
  <div class="tooltip">

    <slot></slot>

    <article
      class="tooltip-bubble message"
      :class="[position]"
      >
      <div class="message-header">
        <p>Hello World</p>
        <button class="delete" aria-label="delete"></button>
      </div>
      <div class="message-body">
        <slot name="message"></slot>
      </div>
    </article>


  </div>
</template>

<script>

import { Validators, Validate } from '../models/properties/validators'

export default {
  name: 'Tooltip',
  props: {
    vertical: {
      type: String,
      default: undefined,
      validator: Validate(
        Validators.oneOf(['top','bottom', null, undefined])
      )
    },
    horizontal: {
      type: String,
      default: undefined
    }
  },
  computed: {
    position () { return "" }
  }


}

</script>

<style scoped lang='scss'>

.tooltip {
  display: inline;
  position: relative;

  .tooltip-bubble  {
    position: absolute;
    display: none;
  }

}

</style>
