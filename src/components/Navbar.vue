<template>
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
          v-if="isAdmin"
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
          <coming-soon><theme-switch @themeChanged="onThemeChanged" /></coming-soon>
        </div>
        <div class="navbar-item">
          <coming-soon><login /></coming-soon>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import Login from '@/components/Login.vue'

  export default {
    components: {
      'login': Login
    },
    data () {
      return {
        scrolled: false,
        isActive: false
      }
    },
    computed: {
      transparentNavbar () {
        return !(this.scrolled || this.$route.name != "Home" || this.isActive)
      },
      isAdmin() {
        return this.$svsAuth.isAdmin
      }
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll)
      this.handleScroll()
    },
    methods: {
      onThemeChanged (theme) {
        this.theme = theme
        if (JSON.parse(this.$data.cookiepreferences).functional == true) {
          this.$cookie.set('usertheme', theme, {expires : '6M'})
        }
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
