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
        data-target="navbar"
        :class="{ 'is-active': isActive }"
        @click="isActive = !isActive"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div
      id="navbar"
      :key="$route.fullPath"
      class="navbar-menu"
      :class="{ 'is-active': isActive }"
    >
      <div class="navbar-start">
        <div
          v-for="item in navbarItems"
          :key="item._vueid"
          class="navbar-item is-hoverable"
          :class="{ 'has-dropdown': item.children }"
        >
          <router-link
            :class="{ 'navbar-item': item.children }"
            :to="item.to"
          >
          {{ item.display }}
          </router-link>

          <div
            v-if="item.children"
            class="navbar-dropdown"
          >
            <router-link
              v-for="child in item.children"
              :key="child._vueid"
              class="navbar-item"
              :to="child.to"
            >
              {{ child.display }}
            </router-link>
          </div>
        </div>
      </div>
      <!-- Middle -->
      <div class="navbar-end">
        <div class="navbar-item">
          <coming-soon><theme-switch @themeChanged="onThemeChanged" /></coming-soon>
        </div>
        <div class="navbar-item">
          <login />
        </div>
      </div>
      <!-- End of navbar -->
    </div>
  </nav>
</template>

<script>
  import Login from '@/components/Login.vue'
  import { routes, navbarContent } from '@/router'

  console.log(routes, navbarContent)
  export default {
    components: {
      'login': Login
    },
    data () {
      return {
        scrolled: false,
        isActive: false,
        navbarContent: navbarContent
      }
    },
    computed: {
      transparentNavbar () {
        return !(this.scrolled || this.$route.name != "Home" || this.isActive)
      },
      isAdmin() {
        return this.$svsAuth.isAdmin
      },
      navbarItems() {
        return navbarContent.filter(item => {
          if (item.requiresAdmin && !this.isAdmin ) return false
          return true
        })
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
