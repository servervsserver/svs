<template>
  <div
    class="flip-album-container"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    <div class="flip-album">
      <div class="flip-album-recto">
        <img class="cover-art"
          :src="image" width="250" height="250" />
      </div>
      <div class="flip-album-verso">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlipAlbum',
  props: {
    size: {
      type: Number,
      default: 250
    },
    image: {
      type: String,
      default: "/placeholders/uwu_colored_svs.jpg"
    }
  }

}
</script>

<style scoped lang='scss'>
.flip-album-container {

  width: 200px;
  height: 200px;
  display: inline-block;

  perspective: 400px;

  .flip-album {

    position: relative;
    width: 100%;
    height: 100%;

    transform-origin: center;
    transform-style: preserve-3d;
    transform: scale(1.0) rotateY(8deg);
    transition: 0.5s transform;
    box-shadow: 0 0px 8px 0px #00000080 inset, 0 24px 38px 3px rgb(0 0 0 / 14%), 0 9px 46px 8px rgb(0 0 0 / 12%), 0 11px 15px -7px rgb(0 0 0 / 40%);

    .flip-album-recto,
    .flip-album-verso {
      position: absolute;
      width: 100%;
      height: 100%;
      text-align: center;
      backface-visibility: hidden;
    }

    .flip-album-recto {
      /* z-index: 2; */
      box-shadow: 0 0px 8px 0px #00000080 inset;
    }

    .flip-album-verso {
      padding: 10px;
      transform: rotateY(180deg);
      background-color: #F5816B;
      box-shadow: 0 0px 8px 0px #00000080 inset;
    }

    .flip-album-recto img {
      width: 100%;
      height: 100%;
      /* backface-visibility: hidden;
      -webkit-backface-visibility: hidden; */
    }

  }

  &:hover,
  &:active {
    .flip-album {
      transform: scale(1.1) rotateY(185deg);
      .flip-album-recto {
        z-index: 1;
      }

      .flip-album-verso {
        z-index: 2;
      }
    }
  }

  /* @keyframes flip-album-index-swap-up {
    0% {
      z-index: 0
    }
  } */
}
</style>
