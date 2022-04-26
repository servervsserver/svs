<template>
  <div class="container">
    <h1>Backend for devs. Do not touch if you don't know exactly what you are doing</h1>
    <div>
      Write the admins to server map in Firebase.
      <button
        class="button"
        @click="writeAdminServMap"
      >
        Update
      </button>
    </div>
    <modal ref="modal">
      Done!
    </modal>
  </div>
</template>

<script>
import ModalComponent from "@/components/Modal.vue"

export default {
  components: {
    'modal': ModalComponent
  },
  async mounted() {
    // let data = await this.$svsBackend.getAllServers()

  },
  methods: {
    async writeAdminServMap() {
      let res = await this.$svsBackend.writeAdminServMap()
      console.log(res)
      this.$refs.modal.open()
    }
  }
}
</script>