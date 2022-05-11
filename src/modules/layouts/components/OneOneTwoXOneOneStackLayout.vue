<template>
  <div class="two-top-then-stack-layout">
    <div class="columns is-multiline is-mobile">
      <div class="column is-6-desktop is-12-mobile">
        <div class="columns is-multiline is-mobile">
          <div class="column is-6">
            <slot name="topLeftLeft" />
          </div>

          <!-- <div class="column is-6-mobile is-hidden-desktop">
            <squared-image-box style="max-width: 100%;">
              <img
                :src="coverArtUrl"
                class="cover-art shadow-depth-1"
              >
            </squared-image-box>
          </div> -->

          <div class="column is-6-desktop is-6-tablet">
            <slot name="topLeftRight" />
          </div>

          <div class="column is-12">
            <slot name="bottomLeft" />
          </div>
        </div>
      </div>

      <div
        class="column is-6-desktop is-12-mobile"
      >
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>