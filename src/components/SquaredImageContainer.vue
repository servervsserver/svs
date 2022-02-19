<template>
  <div
    class="image-container shadow-depth-1"
  >
    <div
      class="image-content"
    >
      <slot />
    </div>
  </div>
</template>

<script>
</script>

<style scoped lang="scss">

.image-container {
  position: relative;

  &:before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url("/placeholders/server_placeholder_icon.png");
    background-size: contain;
    box-shadow: 1px 1px 10px 0px rgba(0,0,0,0.8) inset;
    content: "";
    opacity: 0.2;
  }
  border-radius: 4px;
  overflow: hidden;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  .image-content {
    position: absolute;
    width: 100%;
    height: 100%;
    & > * {
      position: relative;
      z-index: 2;
    }
  }


  .placeholder {
    position: absolute;
    z-index: 1;
  }
}

</style>
