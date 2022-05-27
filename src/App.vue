<template>
  <div
    :class="[theme]"
  >
    <!-- <CookieBanner /> -->
    <div id="top" />
    <div class="app-container">
      <svs-navbar />

      <!-- Router view -->
      <div
        id="main-router-view"
        class="router-view gradient_bg_wrapper"
      >
        <Transition name="pageTransition">
          <router-view />
        </Transition>
      </div>
      <!-- End router view -->

      <svs-footer />
    </div>

    <audio-player />
  </div>
</template>

<script>
// @ is an alias to /src

// import CookieBanner from '@/components/cookie/CookieBanner.vue'

import Navbar from "@/components/Navbar.vue"
import Footer from "@/components/Footer.vue"

export default {
  components: {
    // CookieBanner,
    'svs-navbar': Navbar,
    'svs-footer': Footer
  },
  data () {
    return {
      // audioPlayer: this.$svsAudioPlayer.player
      // cookiepreferences: cookiepreference
    }
  },
  computed: {
    theme () {
      return this.$svsSettings.theme
    },
    audioPlayer() { return this.$svsAudioPlayer.player }
  },
  methods: {
    deletecookiesettings : function () {
      this.$cookie.delete('cookiepreference');
      this.$router.go()
    },
    setCookiePreferences : function (preferenceobject) {
      this.$data.cookiepreferences = preferenceobject
    },

  }
}

</script>

<style lang="scss">

@use 'assets/styles/main';

#main-router-view {
  min-height: 100vh;
  & > * {
    min-height: 100vh;
    padding-top: 49px;
    padding-bottom: 60px;
  }
}

.pageTransition-enter-active,
.pageTransition-leave-active {
  transition: opacity 0.15s ease;
  background: inherit;
}

.pageTransition-enter-from,
.pageTransition-leave-to {
  opacity: 0;
}

// .player {
//   display: flex;
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   background: #333366;
//   justify-content: center;
//   align-content: stretch;

//   .player-container {
//     display: flex;
//     max-width: 960px;
//     flex-grow: 1;
//     // box-shadow: 0 0 2px 2px #333366;
//     & > * {
//       flex-grow: 1;
//     }

//     & > .vertical-split {
//       flex-grow: 0;
//     }
//   }

//   .vertical-split {
//     position: relative;
//     height: 100%;
//     width: 0px;
//     background-color: black;
//     &::before {
//       position: absolute;
//       display: block;
//       height: 60%;
//       width: 1px;
//       background: #F5816B;
//       content: ' ';
//       top: 20%;
//       left: 0;
//     }
//   }
// }

</style>
