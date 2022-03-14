<template>
  <div class="spinner-container">
    <div class="sk-folding-cube">
      <div class="sk-cube1 sk-cube" />
      <div class="sk-cube2 sk-cube" />
      <div class="sk-cube4 sk-cube" />
      <div class="sk-cube3 sk-cube" />
    </div>
  </div>
</template>

<style scoped lang='scss'>
/* The spinner scales with font-size */
.spinner-container {
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;

  .sk-folding-cube {
    width: 100%;
    height: 100%;
    position: relative;
    transform: rotateZ(45deg) scale(0.707);

    .sk-cube {
      float: left;
      position: relative;
      width: 50%;
      height: 50%;
    }
    .sk-cube:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #f5816b 0%, #f5816b 10%, #333366 100%);
      /* background: conic-gradient(#f5816b 140deg, #333366, #f5816b 220deg); */
      animation: sk-foldCubeAngle 2.4s infinite linear both;
      transform: scale(0.9);
      transform-origin: 100% 100%;
      box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%), 0 1px 5px 0 rgb(0 0 0 / 20%)
    }
    .sk-cube2 {
      transform: rotateZ(90deg);
    }
    .sk-cube3 {
      transform: rotateZ(180deg);
    }
    .sk-cube4 {
      transform: rotateZ(270deg);
    }
    .sk-cube2:before {
      animation-delay: 0.3s;
    }
    .sk-cube3:before {
      animation-delay: 0.6s;
    }
    .sk-cube4:before {
      animation-delay: 0.9s;
    }

    @keyframes sk-foldCubeAngle {
      0%,
      10% {
        transform: perspective(14em) rotateX(-180deg);
        opacity: 0;
      }
      25%,
      75% {
        transform: perspective(14em) rotateX(0deg);
        opacity: 1;
      }
      90%,
      100% {
        transform: perspective(14em) rotateY(180deg);
        opacity: 0;
      }
    }
  }
}
</style>

<script>
export default {
  name: "Spinner"
};
</script>
