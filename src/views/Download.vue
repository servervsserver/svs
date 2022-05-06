<template>
  <div>
    <div v-if="all.length > 0">
      <div
        v-for="(ep, index) in all"
        :key="index"
      >
        <h3>{{ ep.name }}</h3>
        <br>
        <a
          v-if="ep.visualizer_link"
          :href="ep.visualizer_link"
        >LINK TO VISUALIZER</a>
        <br>
        <button @click="download(index)">
          DOWNLOAD TRACKS
        </button>
        <hr>
      </div>
    </div>
    <div v-if="all.length == 0">
      <h1>loading gabagool..</h1>
    </div>
    ]
    <!-- <audio v-for="track in tracks" v-bind:key="track.id" :src="track.url" /> -->
  </div>
</template>

<script>
let once = false;

export default {
  data: function () {
    return {
      curr: {},
      all: [],
    };
  },
  async mounted() {
    if (!once) {
      console.log("start");
      let a = await this.$svsBackend.getAllAlbumsUrls();
      this.all = a;
      once = true;
      console.log("done");
    }
  },
  methods: {
    download: function (ind) {
      console.log(ind);
      let curr = this.all[ind];
      for (let link in curr.tracks) {
        let ct = curr.tracks;

        window.open(ct[link]);
      }
    },
  },
};
</script>

<style>
</style>