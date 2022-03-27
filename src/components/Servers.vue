<template>
  <div class="mt-4 columns is-multiline is-tablet">
    <div
      class="column is-half is-full-mobile"
      v-bind:key="server.name"
      v-for="server in sortBy(serverApplications, 'name')"
    >
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-96x96">
                <img
                  :src="'https://' + server.icon_url"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{ server.name }}</p>
              <p class="subtitle is-6 tags">
                <span v-for="a in server.admins" :key="a" class="tag">
                  {{ a }}
                </span>
              </p>
            </div>
          </div>

          <div class="content">
            {{ server.description }}
            <br />
          </div>
        </div>

        <footer class="card-footer">
          <a :href="server.discord_invite" class="card-footer-item"
            >Join Server</a
          >
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Servers",
  data: function () {
    return {
      serverApplications: [],
    };
  },
  computed: {
    sortBy(arr, key) {
      if (arr.length > 0) {
        arr = arr.serverApplications;
        console.log(arr);
        return arr.sort((a, b) => a[key].localeCompare(b[key]));
      }
      return arr;
    },
  },
  mounted() {
    this.$svsBackend.getAppServers(1).then((res) => {
      this.serverApplications = res;
    });
  },
};
</script>

<style scoped>
.card {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.card-footer {
  margin-top: auto;
  background-color: #f5816b;
  color: #fffade;
  transition: background-color 0.5s;
}
</style>