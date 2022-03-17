<template>
  <div
    class="drawer-container"
    :class="[modeClass, openedClass]"
  >
    <div
      v-if="hasBackdrop"
      class="backdrop"
      @click="close"
    />
    <aside
      class="drawer-sidebar"
    >
      <div class="drawer-sidebar-inner shadow-depth-3">
        <slot name="aside" />
      </div>
    </aside>
    <div class="drawer-content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>

import { Validators, Validate } from '@/modules/cdk/validators'

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    hasBackdrop: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: 'over',
      validator: Validate(
        // Validators.oneOf(['over', 'push', 'side'])
        Validators.oneOf(['over'])
      )
    }
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

/* .drawer-container {
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  align-content: flex-start;
  gap: 0px;

  & > * {
    flex-grow: 1;
  }

  .drawer-sidebar {
    flex-basis: content;
    flex-grow: 0;
  }

  .drawer-content {
    flex-grow: 1;
  }


}

.drawer-container.closed {
  .drawer-sidebar {
    flex-basis: 0px;
    width: 0px;
  }
} */
.drawer-container {
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;

  .drawer-sidebar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: auto;
    /* height: 100%; */
    z-index: 3;
    pointer-events: none;

    .drawer-sidebar-inner {
      height: 100%;
      pointer-events: all;
    }
  }

  .drawer-content {
    position: relative;
    height: auto;
    z-index: 0;
  }

  .backdrop {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    background: #0004;
  }

  &.mode-over {
    .drawer-sidebar-inner {
      position: relative;
      top: 0;
      left: 0;
      transition: 0.35s ease left, 0.35s ease right;
      width: 100%;
    }

    &.opened {
      .drawer-sidebar-inner {
        left: -0%;
      }
      .backdrop {
        display: block;
      }
    }

    &.closed {
      .drawer-sidebar-inner {
        left: -100%;
      }
      .backdrop {
        display: none;
      }
    }
  }

}

/* For testing */
/* .drawer-container {
  & > * { opacity: 1; }
  .drawer-sidebar {
    background-color: rgba(128,128,0,0.5);
    .drawer-sidebar-inner {
      background-color: yellow;
    }
  }

  .drawer-content {
    background-color: rgba(128,0,128,0.5);
  }
} */
</style>
