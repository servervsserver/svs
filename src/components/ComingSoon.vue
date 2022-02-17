<template>
  <div :class="klass">
    <slot v-if="isComingSoonBypassed" />
    <p
      v-if="!isComingSoonBypassed && isPage"
      class="coming-soon-message"
    >
        Coming soon...
    </p>
  </div>
</template>

<script>
import { Validators, Validate } from '../models/properties/validators'

export default {
  props: {
    type: {
      type: String,
      default: 'hidden',
      validator: Validate(Validators.oneOf(['page', 'hidden']))
    }
  },
  computed: {
    isComingSoonBypassed() {
      return this.$store.getters.isComingSoonBypassed
    },
    isPage() {
      return this.type == 'page'
    },
    isHidden() {
      return this.type == 'hidden'
    },
    klass () {
      if (this.isComingSoonBypassed) return ""
      if (this.isPage) return "coming-soon-page"
      if (this.isHidden) return "coming-soon-hidden"
      return ""
    }
  }

}
</script>

<style scoped lang='scss'>
.coming-soon-page {
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  align-content: center;
  justify-content: center;

  .coming-soon-message {
    align-self: flex;
    margin-top: 30px;
    text-align: center;
    text-transform: uppercase;
    font-family: "Montserrat", "Jost", sans-serif;
    font-size: 3em;
    &, * { font-weight: 500 !important; }
    letter-spacing: 5px;
    text-shadow: 3px 4px 0px rgb(255, 186, 94, 0.2);
  }
}
</style>
