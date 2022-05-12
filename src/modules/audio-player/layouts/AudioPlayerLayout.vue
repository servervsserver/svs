<template>
  <div class="layout-container">
    <div class="columns is-multiline is-gapless">
      <div class="column is-12">
        <slot name="audioBar"></slot>
      </div>
      <div class="column is-12">
        <div class="columns is-mobile is-variable is-2 is-vcentered">
          <div class="column is-4-desktop is-6-touch">
            <div class="columns is-mobile is-gapless">
              <div class="column is-narrow">
                <slot name="coverArt"></slot>
              </div>
              <div class="column">
                <slot name="metadatas"></slot>
              </div>
            </div>
          </div>
          <div class="column">
            <slot name="coreControls"></slot>
          </div>
          <div class="column is-2-touch is-4-desktop">
            <div class="columns is-mobile is-gapless" style="justify-content: flex-end">
              <div class="column is-narrow">
                <slot name="time"></slot>
              </div>
              <!-- <div class="column is-narrow hidden-if-empty">
                <slot name="volume"></slot>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
}
</style>