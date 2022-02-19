<template>
  <div
    :class="[theme]"
  >
    <pre-opening>
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
    </pre-opening>
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
      // cookiepreferences: cookiepreference
    }
  },
  computed: {
    theme () {
      return this.$svsSettings.theme
    }
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

</style>
