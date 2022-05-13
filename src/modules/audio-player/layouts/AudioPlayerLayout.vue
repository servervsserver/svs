<template>
  <div 
    class="layout-container"
    :class="{ 'is-extended': extended }"
  >
    <div class="columns is-multiline is-gapless">
      <div class="column is-12 is-hidden-out-extended">
        <div 
          class="columns is-mobile is-multiline is-gapless clickable is-vcentered"
        >
          <div 
            class="column is-12-touch is-6-desktop"
            @click="toggleExtended()"
          >
            <slot name="coverArtBig" />
          </div>
          <div class="column is-12-touch is-6-desktop has-text-centered-touch">
            <slot name="metadatas" />
          </div>
        </div>
      </div>
      <div class="column is-12">
        <div 
          class="columns is-mobile is-gapless" 
          style="margin-bottom: 0px;"
        >
          <div class="column">
            <slot name="currentTime" />
          </div>
          <div class="column has-text-right">
            <slot name="duration" />
          </div>
        </div>
        <slot name="audioBar" />
      </div>
      <div class="column is-12">
        <div class="columns is-mobile is-variable is-2 is-vcentered">
          <div
            class="column is-4-desktop is-6-touch is-hidden-in-extended"
          >
            <div 
              class="columns is-mobile is-gapless clickable"
              @click="toggleExtended()"
            >
              <div class="column is-narrow">
                <slot name="coverArt" />
              </div>
              <div class="column">
                <slot name="metadatas" />
              </div>
            </div>
          </div>
          <div class="column">
            <slot name="coreControls" />
          </div>
          <div 
            class="column is-2-touch is-4-desktop"
            style="display: flex; justify-content: flex-end; padding: 0px 15px;"
          >
            <slot name="volume" />
          </div>
        </div>
      </div>
      <div 
        class="column is-12 is-hidden-out-extended" 
        style="height: 40vh;"
      >
        <slot name="playlist" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      extended: false
    }
  },
  methods: {
    toggleExtended() {
      this.extended = !this.extended
    }
  }
}
</script>

<style lang="scss" scoped>

$transition-duration: 0.5s;
.layout-container {
  width: 100%;
  transition: min-height $transition-duration;
  min-height: 5vh;

  & {
    .is-hidden-in-extended {
      opacity: 1;
      transition: 
        opacity $transition-duration, 
        max-width $transition-duration ;
      max-width: 100vw;
    }

    .is-hidden-out-extended {
      transition: 
        opacity $transition-duration, 
        max-width $transition-duration ;
    };
  }

  &:not(.is-extended) {
    .is-hidden-out-extended {
      opacity: 0;
      max-width: 0vw;
      max-height: 0vh !important;
      height: 0vh !important;
    }
  }

  &.is-extended {
    min-height: 90vh;

    .is-hidden-in-extended {
      opacity: 0;
      max-width: 0vw;
    }

    .is-hidden-out-extended {
      opacity: 1;
      max-width: 100vw;
      max-height: 100vh !important;
    }
  }

}
</style>