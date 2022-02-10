<template>
  <div>
    <slot v-if="isComingSoonBypassed" />
    <div
      v-if="!isComingSoonBypassed"
      class="container has-text-centered"
    >
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
