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
    <hr/>
    <div class="columns">
      <div class="column is-3" >
        <text-input v-model="server_id" :label="'Server id'"/>
      </div>
      <div class="column is-3" >
        <text-input v-model="album_id" :label="'Album id'"/>
      </div>
      <div class="column is-3" >
        <text-input v-model="event_id" :label="'Event id'"/>
      </div>
    </div>
    <button
      class="button"
      @click="writeSomethingToCatalogs"
    >
      Write
    </button>
  </div>
</template>

<script>

import TextInputComponent from "@/modules/forms/components/fields/TextInput.vue"

export default {
  components: {
    'text-input': TextInputComponent
  },
  async mounted() {
    // let data = await this.$svsBackend.getAllServers()

  },
  data: () => {
    return {
      server_id: null,
      album_id: null,
      event_id: "svs_iv"
    }
  },
  methods: {
    async writeAdminServMap() {
      let res = await this.$svsBackend.writeAdminServMap()
      console.log(res)
    },
    async writeSomethingToCatalogs() {
      await this.$svsBackend.writeAlbumInServerCatalog(this.album_id, this.event_id, this.server_id)
      await this.$svsBackend.writeAlbumInEventCatalog(this.album_id, this.event_id, this.server_id)
    }
    
  }
}
</script>