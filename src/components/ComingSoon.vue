<template>
  <div>
    <slot v-if="isComingSoonBypassed"></slot>
    <div class="container has-text-centered"  v-if="!isComingSoonBypassed">
      <h1>Coming soon...</h1>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isComingSoonBypassed() {
      return this.$store.getters.isComingSoonBypassed
    }
  }
}
</script>
