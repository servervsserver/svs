<template>
  <div class="buttons">
    <a
      v-if="!isAuthenticated"
      :href="url"
      class="button is-dark"
    >
      Log in with Discord
    </a>
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
const discord_client_id = process.env.VUE_APP_DISCORD_ID;
const url = encodeURIComponent(process.env.VUE_APP_CALLBACK_URL);

export default {
  name: "Login",
  data: function () {
    return {
      test: "",
      url: `https://discord.com/api/oauth2/authorize?response_type=token&client_id=${discord_client_id}&scope=identify&state=15773059ghq9183habn&redirect_uri=${url}&prompt=consent`,
    };
  },
  computed: {
    isAuthenticated() {
      return this.$svsAuth.isAuthenticated
    },
    user() {
      return this.$svsAuth.user
    }
  },
  updated: function () {},
  mounted: function () {},
  methods: {
    logout() {
      this.$svsAuth.logout()
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
