<template>
  <div
    :class="[theme]"
    nativeOnScroll="handleScroll"
  >
    <CookieBanner @cookiePreferenceChange="setCookiePreferences" />
    <div id="top" />
    <div class="app-container">
      <nav
        class="navbar"
        :class="{'transparent': transparentNavbar}"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <router-link
            class="navbar-item"
            to="/"
          >
            <div class="navbar-brand-image svs-logo" />
          </router-link>
          <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            :class="{ 'is-active': isActive }"
            @click="isActive = !isActive"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div
          id="navbarBasicExample"
          class="navbar-menu"
          :class="{ 'is-active': isActive }"
        >
          <div class="navbar-start">
            <!-- Main event menu -->
            <div
              :key="$route.fullPath + '@mainevent'"
              class="navbar-item has-dropdown is-hoverable"
            >
              <router-link
                class="navbar-item"
                to="/main-event/overview"
              >
                <brand-name-short />&nbsp;IV
              </router-link>

              <div class="navbar-dropdown">
                <router-link
                  class="navbar-item"
                  to="/main-event/overview"
                >
                  Overview
                </router-link>
                <router-link
                  class="navbar-item"
                  to="/main-event/rules"
                >
                  Rules
                </router-link>
                <router-link
                  class="navbar-item"
                  to="/main-event/server-application"
                >
                  Server application
                </router-link>
                <router-link
                  class="navbar-item"
                  to="/main-event/ep-upload"
                >
                  EP Submission
                </router-link>
              </div>
            </div>
            <div
              class="navbar-item"
            >
              <router-link
                class="navbar-item"
                to="/archives"
              >
                Archives
              </router-link>
            </div>
            <!-- Admin menu  -->
            <div
              v-if="$store.getters.isAdmin"
              :key="$route.fullPath + '@madmin'"
              class="navbar-item has-dropdown is-hoverable"
            >
              <router-link
                class="navbar-item"
                to="/admin/dashboard"
              >
                Admin
              </router-link>

              <div class="navbar-dropdown">
                <router-link
                  class="navbar-item"
                  to="/admin/dashboard"
                >
                  Dashboard
                </router-link>
              </div>
            </div>

            <router-link
              class="navbar-item"
              to="/about"
            >
              About us
            </router-link>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <theme-switch @themeChanged="onThemeChanged" />
            </div>
            <div class="navbar-item">
              <Login />
            </div>
          </div>
        </div>
      </nav>


      <!-- Router view -->
      <div
        id="main-router-view"
        class="router-view"
      >
        <Transition name="pageTransition">
          <router-view />
        </Transition>
      </div>
      <!-- End router view -->

      <footer class="footer">
        <div class="content has-text-centered">
          <div class="columns">
            <div class="column">
              <h4>
                <router-link to="/main-event/overview">
                  <brand-name /> IV
                </router-link>
              </h4>
              <ul>
                <li>
                  <router-link to="/main-event/overview">
                    Overview
                  </router-link>
                </li>
                <li>
                  <router-link to="/code-of-conduct">
                    Code of Conduct
                  </router-link>
                </li>
                <li>
                  <router-link to="/main-event/rules">
                    Rules
                  </router-link>
                </li>
                <li>
                  <router-link to="/main-event/server-application">
                    Server Application
                  </router-link>
                </li>
              </ul>
            </div>

            <!-- <div class="column">
              <h4>Archive</h4>
              <ul>
                <li>
                  <router-link to="">
                    A link
                  </router-link>
                </li>
                <li>
                  <router-link to="">
                    Another  link
                  </router-link>
                </li>
                <li>
                  <router-link to="">
                    Yet another link
                  </router-link>
                </li>
              </ul>
            </div> -->

            <div class="column">
              <h4>Get in touch</h4>
              <ul>
                <li>
                  <router-link to="/anonymous-concerns">
                    Anonymous Concerns
                  </router-link>
                </li>
                <li>
                  <router-link to="/about">
                    About us
                  </router-link>
                </li>
              </ul>
            </div>

            <div class="column">
              <h4>Cookies</h4>
              <ul>
                <li>
                  <a @click="deletecookiesettings">
                    Revoke Cookie Consent
                  </a>
                </li>
                <li>
                  <router-link to="/cookie-policy">
                    Cookie Policy
                  </router-link>
                </li>
              </ul>
            </div>
          </div>




          <section class="social-medias columns">
            <div
              v-for="sml in socialMediaLinks"
              :key="sml.link"
              class="column"
            >
              <a :href="sml.link" class="social-media-item">
                <i
                  :class="sml.iconClass"
                  style="font-size: 1.5em;"
                />
                <!-- <br class="only-desktop"> -->
                <span style="whitespace: nowrap;">{{ sml.text }}</span>
              </a>
            </div>
          </section>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import CookieBanner from '@/components/CookieBanner.vue'

export default {
  components: {
    Login, CookieBanner
  },
  data () {
    var cookiepreference = this.$cookie.get('cookiepreference')
    var themecookie = this.$cookie.get('usertheme') == null ? 'dark-theme' : this.$cookie.get('usertheme')
    return {
      scrolled: false,
      theme: themecookie,
      isActive: false,
      cookiepreferences: cookiepreference,
      socialMediaLinks: [
        {
          text: 'Discord',
          iconClass: "fab fa-discord",
          link: 'https://discord.com/invite/8wsGFwxT5S'
        },
        {
          text: 'servervsserver',
          iconClass: "fab fa-twitch",
          link: 'https://www.twitch.tv/servervsserver'
        },
        {
          text: '@servervsserver_',
          iconClass: "fab fa-instagram",
          link: 'https://www.instagram.com/servervsserver_/'
        },
        {
          text: '@servervsserver_',
          iconClass: "fab fa-tiktok",
          link: 'https://www.tiktok.com/@servervsserver_'
        },
        {
          text: '@servervsserver_',
          iconClass: "fab fa-twitter",
          link: 'https://twitter.com/servervsserver_'
        },
        {
          text: 'servervsserver',
          iconClass: "fab fa-reddit",
          link: 'https://www.reddit.com/r/servervsserver/'
        },
        {
          text: 'SvS VODs',
          iconClass: "fab fa-youtube",
          link: 'https://www.youtube.com/channel/UCZuoaVtW6W0Eck9_OnB5F3Q'
        }
      ]
    }
  },
  computed: {
    transparentNavbar () {
      // console.log()
      return !(this.scrolled || this.$route.name != "Home" || this.isActive)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    onThemeChanged (theme) {
      this.theme = theme
      if (JSON.parse(this.$data.cookiepreferences).functional == true) {
        this.$cookie.set('usertheme', theme, {expires : '6M'})
      }
    },
    deletecookiesettings : function () {
      this.$cookie.delete('cookiepreference');
      this.$router.go()
    },
    setCookiePreferences : function (preferenceobject) {
      this.$data.cookiepreferences = preferenceobject
    },
    handleScroll (evt) {
      if (window.scrollY > 49) {
        this.scrolled = true
      } else {
        this.scrolled = false
      }
    }
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
}

.pageTransition-enter-from,
.pageTransition-leave-to {
  opacity: 0;
}

</style>
