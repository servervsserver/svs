<template>
  <div class="progress-bar">
    <div
      ref="track"
      class="progress-bar-track"
      @mousedown="onMouseDown($event)"
    >
      <div
        ref="trackAdvance"
        class="progress-bar-advance"
        :style="{ width: percent + '%' }"
      />
    </div>
    <div
      ref="thumb"
      class="progress-bar-thumb"
      :style="{ left: percent + '%' }"
    >
      <div
        class="progress-bar-thumb-circle"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    min: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 20
    },
    max: {
      type: Number,
      default: 100
    }
  },
  computed: {
    range() {
      return this.max - this.min
    },
    ratio() {
      return this.value / (this.range || 1)
    },
    percent() {
      return this.ratio * 100
    }
  },
  methods: {
    onMouseDown(event) {
      let trackWidth = this.$refs.track.offsetWidth
      let clickPos = event.offsetX
      let posRatio = clickPos / trackWidth


      let omm = (evt) => {
        // console.log("Moving!")
        this.handleProgressPanmove(evt)
      }
      let omu = (evt) => {
        console.log("Stoping the moviemiento")
        window.removeEventListener( 'mousemove', omm )
        window.removeEventListener( 'mouseup', omu)
      }

      window.addEventListener( 'mousemove', omm )
      window.addEventListener( 'mouseup', omu)

      this.changeValue(posRatio * this.range)
    },
    handleProgressPanstart(event) {

    },
    handleProgressPanend(event) {

    },
    handleProgressPanmove(event) {
      let pageX = event.x
      let bcr = this.$refs.track.getBoundingClientRect()

      let offsetLeft = (pageX - bcr.left)
      let trackWidth = this.$refs.track.offsetWidth

      let ratio = offsetLeft / (trackWidth || 1)
      ratio = Math.max(0, Math.min(ratio, 1))


      this.changeValue(ratio * this.range)
    },
    changeValue(newVal) {
      let newValue = newVal
      this.$emit('change', newValue)
    }
  }
}
</script>

<style scoped lang='scss'>
@use 'sass:color';

$pb-height: 8px;
/* $thumb-size: $pb-height * 1.5;
$thumb-half-size: $thumb-size * 0.5; */
$transi-duration: 0.25s;
.progress-bar {

  user-select: none;
  --progress-bar-height: #{$pb-height};
  --thumb-size-half: #{$pb-height * 0.5};
  
  &, * {
    transition: $transi-duration left,
      $transi-duration width,
      $transi-duration box-shadow;
  }

  // background: yellow;
  display: block;
  position: relative;
  width: 100%;
  height: var(--progress-bar-height);

  .progress-bar-track {
    position: relative;
    background: color.mix(#000, #f5816b, 50%);
    width: 100%;
    height: calc(var(--progress-bar-height) * 0.6);
    top: calc(var(--progress-bar-height) * 0.2);
    box-shadow: 0px 0px 2px 0px #333366;
    border-radius: 3px;

    cursor: pointer;

    .progress-bar-advance{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: #f5816b;
      border-radius: 3px;
    }
  }

  .progress-bar-thumb {
    position: absolute;
    top: 50%;
    left: 0%;
    width: 0px;
    height: 0px;
    transform: translate(
      calc(var(--thumb-size-half) * -1),
      calc(var(--thumb-size-half) * -1)
    );

    .progress-bar-thumb-circle {
      display: block;
      width: calc(var(--thumb-size-half) * 2);
      height: calc(var(--thumb-size-half) * 2);
      transition: $transi-duration all;
      border-radius: 50%;
      background-color: #333366;
      box-shadow: 0px 0px 0px 1px #f5816b inset,
        0px 0px 2px 3px #000 inset,
        0px 0px 2px 0px #333366;
      touch-action: none;
    }

  }


  &:hover {
    .progress-bar-thumb-circle {
      box-shadow: 0px 0px 1px 2px #f5816b;
    }
    .progress-bar-track {
      background: color.mix(#000, #f5816b, 40%);
    }
  }
  .progress-bar-thumb-circle:hover {
    box-shadow: 0px 0px 1px 1px #f5816b;
    .progress-bar-thumb-circle {
      transform: scale(1.2);

    }
  }
}

</style>
