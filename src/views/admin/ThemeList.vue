<template>
  <div class="container">
    <h1>Themes</h1>
    <div class="table-container">
      <table class="table is-striped is-hoverable">
        <tbody>
          <tr v-for="(theme, ind) in themes" :key="ind">
            <th>{{ theme }}</th>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <article class="panel is-primary">
      <p class="panel-heading">Themes</p>

      <a v-for="(theme, ind) in themes" :key="ind" class="panel-block">
        {{ theme }}
      </a>
    </article> -->
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      themes: [],
    };
  },
  computed: {},
  mounted() {
    this.$svsBackend.getThemeSuggestions().then((res) => {
      this.themes = res.val();
    });
  },
  methods: {},
};
</script>
