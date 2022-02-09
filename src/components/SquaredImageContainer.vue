<template>
  <div
    class="image-container"
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
  // box-shadow: 0 8px 17px 2px rgba(0,0,0,0.14) inset,
  // 0 3px 14px 2px rgba(0,0,0,0.12) inset,
  // 0 5px 5px -3px rgba(0,0,0,0.2) inset;
  // box-shadow: 0 24px 38px 3px rgb(0 0 0 / 14%) inset,
  // 0 9px 46px 8px rgb(0 0 0 / 12%) inset,
  // 0 11px 15px -7px rgb(0 0 0 / 20%) inset;
  box-shadow: 1px 1px 10px 0px rgba(0,0,0,0.2) inset;
  background: url("/placeholders/server_placeholder_icon.png");
  background-size: contain;
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
