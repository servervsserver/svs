<template>
  <div class="buttons">
    <router-link
      v-if="!isAuthenticated"
      to="/login"
      class="button is-dark"
    >
      Log in with Discord
    </router-link>
    <router-link
      v-if="isAuthenticated"
      to="/profile"
      class="button is-dark is-inverted"
    >
      <span class="icon is-small">
        <i class="fas fa-user" />
      </span>
      <span> {{ user.nickname }}</span>
    </router-link>
    <button
      v-if="isAuthenticated"
      class="button is-dark"
      @click="logout()"
    >
      Log out
    </button>
  </div>
</template>

<script>
export default {
  name: "Login",
  computed: {
    isAuthenticated() {
      return this.$svsAuth.isAuthenticated
    },
    user() {
      return this.$svsAuth.user
    }
  },
  methods: {
    logout() {
      this.$svsAuth.logout()
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
