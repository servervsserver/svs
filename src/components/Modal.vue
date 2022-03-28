<template>
  <div
    class="modal svs-modal"
    :class="{'is-active': openedData}"
  >
    <div
      class="modal-background"
      @click="close"
    />
    <div class="modal-card">
      <header
        v-if="$slots.header"
        class="modal-card-head"
      >
        <slot name="header" />
      </header>
      <section class="modal-card-body">
        <slot />
      </section>
      <footer
        v-if="$slots.footer"
        class="modal-card-foot"
      >
        <slot name="footer" />
      </footer>
    </div>
    <button 
      class="modal-close is-large" 
      aria-label="close"
      @click="close"
    />
  </div>
</template>

<script>

export default {
  props: {
      opened: {
          type: Boolean,
          default: false
      },
  },
  data: function() {
    return {
      openedData: false
    }
  },
  computed: {
    openedClass () { return this.openedData ? "opened":"closed" },
    modeClass () { return `mode-${this.mode}` }
  },
  watch: {
    opened: function(newVal, oldVal) {
      this.openedData = newVal
      // console.log(newVal, oldVal, this)
    }
  },
  methods: {
    open () {
      this.openedData = true
    },
    close () {
      this.openedData = false
    },
    toggle () {
      if (this.openedData) this.close()
      else this.open()
    }
  }
}
</script>

<style scoped lang='scss'>
.modal-card-head {
  background: #F5816B !important;
}
.modal-card-body {
  background: #333366 !important;
}
</style>