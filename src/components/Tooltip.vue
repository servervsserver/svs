<template>
  <div
    class="tooltip"
    @click="toggle()"
  >
    <slot />

    <article
      class="tooltip-bubble message shadow-depth-2"
      :class="[position, modeClass]"
    >
      <div class="message-body">
        <slot name="message" />
      </div>
      <div class="anchor-box">
        <div class="anchor-inner" />
      </div>
    </article>
  </div>
</template>

<script>

import { Validators, Validate } from '@/modules/cdk/validators'

export default {
  name: 'Tooltip',
  props: {
    vertical: {
      type: String,
      default: undefined,
      validator: Validate(
        Validators.oneOf(['top','bottom', null, undefined])
      )
    },
    horizontal: {
      type: String,
      default: undefined,
      validator: Validate(
        Validators.oneOf(['left','right', null, undefined])
      )
    },
    mode: {
      type: String,
      default: 'hover',
      validator: Validate(
        Validators.oneOf(['hover', 'toggle', 'click', 'always'])
      )
    }
  },
  data: function () {
    return {
      toggleState: false
    }
  },
  computed: {
    position () {
      let positions = []
      if (this.vertical) positions.push(this.vertical)
      if (this.horizontal) positions.push(this.horizontal)
      return positions.join(" ")
    },
    modeClass () {
      switch (this.mode) {
        case 'always':
          return 'always-on'
        case 'hover':
          return 'on-hover'
        case 'toggle':
          return `toggle toggle-${this.toggleState ? 'on':'off'}`
        case 'click':
          return 'while-clicking'
      }
      return 'on-hover'
    }
  },
  methods: {
    toggle () { return this.toggleState = !this.toggleState }
  }


}

</script>

<style scoped lang='scss'>
@use 'sass:math';

$anchor-size: 10px;
$box-margin: 1px;
$anchor-box: $anchor-size + $box-margin;
$anchor-box-sqrt2: math.div($anchor-box, 1.4142);

.tooltip {
  display: inline;
  position: relative;
  cursor: pointer;

  .tooltip-bubble  {

    /* background: inherit; */
    .message-header {
      /* line-height: 1.4; */
      background: inherit;
      padding: 0;
    }

    .message-body {
      background: inherit;
      border: none;
      line-height: 1.25;
    }

    min-width: 200px;
    font-size: 0.8em;
    text-align: center;

    position: absolute;
    visibility: hidden;
    opacity: 0;
    z-index: 100;
    transition: 0.15s opacity, 0.15s visibility;
    /* display: none; */

    .anchor-box {
      position: absolute;
      display: block;
      overflow: visible;
      width: 0px;
      height: 0px;
      transform: rotate(45deg);

      .anchor-inner {
        top: -$anchor-size * 0.5;
        left: -$anchor-size * 0.5;
        border: 1px solid #8884;
        position: relative;
        width: $anchor-size;
        height: $anchor-size;
      }

    }


    &.top {
      left: 50%;
      top: -$anchor-box;
      transform: translate(-50%, -100%);

      .anchor-box {
        bottom: 0;
        left: 50%;
        .anchor-inner {
          border-top: none;
          border-left: none;
        }
      }
    }

    &.bottom {
      left: 50%;
      bottom: -$anchor-box;
      transform: translate(-50%, 100%);
      .anchor-box {
        top: 0;
        left: 50%;
        .anchor-inner {
          border-bottom: none;
          border-right: none;
        }
      }
    }

    &.left {
      left: -$anchor-box;
      top: 50%;
      transform: translate(-100%, -50%);
      .anchor-box {
        right: 0;
        top: 50%;
        .anchor-inner {
          border-bottom: none;
          border-left: none;
        }
      }
    }

    &.right {
      right: -$anchor-box;
      top: 50%;
      transform: translate(100%, -50%);
      .anchor-box {
        left: 0;
        top: 50%;
        .anchor-inner {
          border-top: none;
          border-right: none;
        }
      }
    }

    &.top.right {
      top: -$anchor-box-sqrt2;
      left: 100%;
      transform: translate($anchor-box-sqrt2, -100%);

      border-bottom-left-radius: 0;

      .anchor-box {
        display: none;
      }
    }

    &.top.left {
      top: -$anchor-box-sqrt2;
      left: -$anchor-box-sqrt2;
      transform: translate(-100%, -100%);

      border-bottom-right-radius: 0;

      .anchor-box {
        display: none;
      }
    }

    &.bottom.right {
      bottom: -$anchor-box-sqrt2;
      left: 100%;
      transform: translate($anchor-box-sqrt2, 100%);

      border-top-left-radius: 0;

      .anchor-box {
        display: none;
      }
    }

    &.bottom.left {
      bottom: -$anchor-box-sqrt2;
      left: -$anchor-box-sqrt2;
      transform: translate(-100%, 100%);

      border-top-right-radius: 0;

      .anchor-box {
        display: none;
      }
    }

  }

  /* Mode always on */
  .tooltip-bubble.always-on  {
    visibility: visible;
    opacity: 1;
  }

  /* Mode hover */
  &:hover {
    .tooltip-bubble.on-hover {
      visibility: visible;
      opacity: 1;
    }
  }

  /* Mode toggle */
  .tooltip-bubble.toggle-on {
    visibility: visible;
    opacity: 1;
  }

  /* Mode click */
  &:active {
    .tooltip-bubble.while-clicking {
      visibility: visible;
      opacity: 1;
    }
  }

}


</style>
