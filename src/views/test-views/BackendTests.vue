<template>
  <div class="container">
    <h1>Backend tests</h1>
    <div>
      Write the admins to server map in Firebase
      <button
        class="button"
        @click="writeAdminServMap"
      >
        Update
      </button>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    // let data = await this.$svsBackend.getAllServers()

  },
  methods: {
    async writeAdminServMap() {
      let res = await this.$svsBackend.writeAdminServMap()
      console.log(res)
    }
  }
}
</script>