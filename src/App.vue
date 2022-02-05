<template>
  <div
    :class="[theme]"
  >
    <div id="top" />
    <div class="app-container">
      <nav
        class="navbar"
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
            <router-link
              class="navbar-item"
              to="/main-event"
            >
              Main event
            </router-link>
            <router-link
              class="navbar-item"
              to="/#about"
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

      <div class="router-view">
        <router-view />
      </div>

      <footer class="footer">
        <div class="content has-text-centered">
          <div class="columns">
            <div class="column">
              <h4>Main event</h4>
              <ul>
                <li>
                  <router-link to="/main-event">
                    Main event
                  </router-link>
                </li>
                <li>
                  <router-link to="/code-of-conduct">
                    Code of conduct
                  </router-link>
                </li>
                <li>
                  <router-link to="/main-event/rules">
                    Rules
                  </router-link>
                </li>
                <li>
                  <router-link to="/main-event/server-application">
                    Server application
                  </router-link>
                </li>
              </ul>
            </div>

            <div class="column">
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
            </div>

            <div class="column">
              <h4>The event staff</h4>
              <ul>
                <li>
                  <router-link to="/anonymous-concerns">
                    Anonymous concerns
                  </router-link>
                </li>
                <li>
                  <router-link to="/about">
                    About us
                  </router-link>
                </li>
              </ul>
            </div>
          </div>

          <section class="social-medias columns">
            <div
              v-for="x in SocMedLinks"
              :key="x.href"
              class="column"
            >
              <a :href="x.href">
                <img
                  :src="x.icon"
                  height="32"
                  width="32"
                > {{ x.text }}
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

export default {
  components: {
    Login
  },
  data () {
    return {
      theme: 'dark-theme',
      isActive: false,
      SocMedLinks: [
        {
          text: '@servervserver',
          icon: '/icons/twitter/16x16_black.svg',
          href: 'https://twitter.com/servervsserver?ref_src=twsrc%5Etfw'
        },
        {
          text: 'servervserver',
          icon: '/icons/twitch/16x16_black.svg',
          href: 'https://www.twitch.tv/servervsserver"'
        }

      ]
    }
  },
  methods: {
    onThemeChanged (theme) {
      this.theme = theme
    }
  }
}

</script>

<style lang="scss">

@use 'assets/styles/main';

.router-view {
  min-height: 100vh;
  padding-top: 120px;
  padding-bottom: 60px;
}

</style>
