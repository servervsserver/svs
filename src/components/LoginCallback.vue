<template>
  <div>
    <Loading />
  </div>
</template>
<script>
import Loading from "./Loading.vue";

export default {
  name: "LoginCallback",
  components: {
    loading: Loading,
  },
  mounted() {
    var hash = window.location.hash.substring(1);
    let params = new URLSearchParams(hash);
    const [accessToken, tokenType] = [
      params.get("access_token"),
      params.get("token_type"),
    ];

    if (!accessToken) {
      return;
    }

    this.$svsAuth.login(tokenType, accessToken);
  },
};
</script>