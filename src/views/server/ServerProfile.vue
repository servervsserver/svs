<template>
  <div class="container">
    <section class="server-overview">
      <div class="column is-hidden-desktop">
        <img
          :src="iconUrl"
          width="100%"
        >
      </div>
      <div class="columns">
        <div class="column is-three-quarters">
          <h1 class="title">
            {{ name }}
          </h1>

          <p
            class="description"
            v-html="description"
          />
        </div>

        <div class="column is-hidden-desktop">
          <a
            target="about:blank"
            :href="serverLink"
          >Join the server</a>
          <br>
          Members: <strong>{{ memberCountFormatted }}</strong>
        </div>

        <div class="column is-hidden-mobile">
          <img
            :src="iconUrl"
            width="180"
          >
          <br>
          <a
            target="about:blank"
            :href="serverLink"
          >Join the server</a>
          <br>
          Members: <strong>{{ memberCountFormatted }}</strong>
        </div>
      </div>
    </section>

    <section class="server-eps">
      <div>
        <h2>Listen to previous EPs</h2>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ServerProfile',
  data: function () {
    return {
      name: 'Name of the server',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae magna quam. Praesent consectetur turpis sed risus euismod, tincidunt fermentum purus gravida. Proin rhoncus tristique sapien vitae ultrices. Suspendisse ac dolor et libero luctus ornare. Sed pulvinar lacus malesuada lectus gravida fermentum. Vivamus consectetur velit dolor, a malesuada ligula rhoncus posuere.<br/> <strong>Pellentesque</strong> habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque volutpat, est quis placerat faucibus, nisl mauris dictum purus, ac posuere tellus massa at nisl. Pellentesque consectetur libero ut elementum pretium. Vivamus consectetur vitae est condimentum euismod. Aliquam sed nisi a ex interdum scelerisque vitae in orci. Suspendisse potenti. Praesent egestas leo nec tincidunt tempor. Suspendisse ut lacinia nisl. Mauris sagittis sed ex ac rhoncus.',
      iconUrl: '/placeholders/server_placeholder_icon.jpg',
      serverLink: 'https://discord.gg/ddCjRh7Fhr',
      memberCount: 69420
    }
  },
  computed: {
    memberCountFormatted: function () {
      return this.memberCount.toLocaleString()
    }
  }
}
</script>

<style scoped lang='scss'>

.title {
  padding-left: 40px;
}

.description {
  text-align: justify;
}
section {
  padding: 5px;
  padding-bottom: 50px;
}
</style>
