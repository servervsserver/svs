<template>
  <div class="container is-fluid">
    <div class="transition-container">
      <transition name="scale">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import { ARCHIVE_ROUTES } from "@/router/routes"

export default {
  data: function() {
    return {
      routes: ARCHIVE_ROUTES
    }
  },
  methods: {
    toggleDrawer () {
      this.$refs.sidenav.toggle()
    }
  }
}
</script>

<style scoped lang='scss'>
  #archive-container.archive-container {
    height: calc(100vh - 49px);
    position: relative;
    padding: 0px;
    padding-top: 49px;
    padding-bottom: 0px;


    .archive-drawer {
      height: 100%;
    }
  }

  .menu-button-1  {
    position: absolute;
    top: 25%;
    left: 0;
    z-index: 1;
  }

  .menu-button-2  {
    position: absolute;
    bottom: 25%;
    left: 0;
    z-index: 1;
  }


  .archive-router-view {
    overflow-y: scroll;
    max-height: calc(100vh - 49px);

    & > * {
      padding: 20px 10px;
    }
  }

  .menu {
    background: #f5816be6;
    padding: 10px;
    height: 100%;
    overflow-y: scroll;
  }

.transition-container {
  position: relative;
  width: 100%;
}
.scale-enter-active,
.scale-leave-active {
  transition: transform 0.5s ease;
  position: relative;
  top: 0;
  left: 0; 
  right: 0;
  & > * {
    position: relative;
  }
}

.scale-leave-active  {
  position: absolute;
}


.scale-enter,
.scale-enter-from,
.scale-leave-to {
  & > * {
    position: absolute;
    top:0;
  }
  opacity: 0;
  transform: scale(0.95);
}

.scale-enter-to,
.scale-leave {
  opacity: 1;
  transform: scale(1);
}
</style>
