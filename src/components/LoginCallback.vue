<template>
  <div class="container-fluid callback-page">
    <section
      v-if="errorType"
      class="error-section has-text-centered"
    >
      <h2>
        Error: {{ errorType }}
      </h2>
      <p>
        {{ errorMessage }}
      </p>
      <p>
        You will be redirected to home page.
      </p>
    </section>
    <div class="spinner-container">
      <spinner />
    </div>
  </div>
</template>
<script>
import Spinner from "@/components/Spinner.vue";

export default {
  name: "LoginCallback",
  components: {
    'spinner': Spinner,
  },
  data() {
    return {
      errorType: "",
      errorMessage: ""
    }
  },
  mounted() {
    var hash = window.location.hash.substring(1);
    let params = new URLSearchParams(hash);

    const [errorType, errorMessage] = [
      params.get("error"),
      params.get("error_description")
    ]

    this.errorType = errorType
    this.errorMessage = errorMessage

    if (this.errorType) {
        setTimeout(() => {
          this.$router.replace({ path: '/home' })
        }, 6000)
    }

    const [accessToken, tokenType] = [
      params.get("access_token"),
      params.get("token_type"),
    ];

    if (!accessToken) {
      return;
    }

    this.$svsAuth.login(tokenType, accessToken);
  }
};
</script>

<style scoped lang='scss'>
.callback-page {
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  align-content: center;
  justify-content: center;

  .spinner-container {
    font-size: 20vw;
  }
}
</style>
