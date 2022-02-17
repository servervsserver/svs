<template>
  <div class="not-open-yet-page">
    <slot v-if="isNotOpenYetBypassed || isFinallyOpen" />
    <div
      v-if="!(isNotOpenYetBypassed || isFinallyOpen)"
      class="front-container"
    >
        <p class="main-title ">Not open yet!</p>
        <event-countdown
          :title="message"
          :time="time"
        />
    </div>
  </div>
</template>

<script>
import { Validators, Validate } from '../models/properties/validators'

export default {
  props: {
    message: {
      type: String,
      default: ""
    },
    time: {
      type: Number,
      default: 0,
      required: true
    }
  },
  computed: {
    isNotOpenYetBypassed() {
      return this.$store.getters.isNotOpenYetBypassed
    },
    isFinallyOpen() {
      return this.time < 0
    }
  }

}
</script>

<style scoped lang='scss'>
.not-open-yet-page {
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  align-content: center;
  justify-content: center;

  .front-container {
    /* align-self: center; */

    .main-title {
      margin-top: 30px;
      text-align: center;
      /* text-transform: uppercase; */
      font-family: "Montserrat", "Jost", sans-serif;
      font-size: 3em;
      &, * { font-weight: 500 !important; }
      letter-spacing: 5px;
      text-shadow: 3px 4px 0px rgb(255, 186, 94, 0.2);
    }
  }
}
</style>
