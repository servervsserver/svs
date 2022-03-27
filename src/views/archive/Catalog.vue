<template>
  <section>
    <h1>Catalog</h1>
    <section class="ep-collection columns is-multiline is-mobile">
      <div
        v-for="ep of allEps"
        :key="ep.id"
        class="ep-block column is-2-desktop is-3-tablet is-6-mobile"
      >
        <div class="ep-block-content">
          <!-- <squared-image-box> -->
          <img
            class="cover-art"
            :src="ep.coverArtUri"
          >
          <!-- </squared-image-box> -->
          <div class="ep-infos">
            <div class="ep-name">
              {{ ep.title }}
            </div>
            <div class="ep-server-name">
              {{ ep.serverId }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>

import {
  ArchiveCatalog,
  ArchiveEp
} from "@/models/dto/archive"


export default {
  data() {
    return {
      catalog: null
    }
  },
  computed: {
    allEps() {
      console.log(catalog)
      console.log("All eps", this.catalog.getAllEps())
      return this.catalog.getAllEps()
    }
  },
  mounted() {
      let catalog = new ArchiveCatalog()
      catalog.addEp(new ArchiveEp("1","Server name","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
      catalog.addEp(new ArchiveEp("2","Server name","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
      catalog.addEp(new ArchiveEp("3","Server name","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
      catalog.addEp(new ArchiveEp("4","Server name","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
      catalog.addEp(new ArchiveEp("5","Server name","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
      catalog.addEp(new ArchiveEp("5","Server name","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
      catalog.addEp(new ArchiveEp("13","Server name","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
      catalog.addEp(new ArchiveEp("14","Server name","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
      catalog.addEp(new ArchiveEp("15","Server name","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
      catalog.addEp(new ArchiveEp("15","Server name","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))

      this.catalog = catalog
  }

}
</script>

<style scoped lang='scss'>
.ep-block {
  .ep-infos {
    font-family: 'Jost';
    padding: 5px;
    .ep-name {
      font-weight: 500;
    }
    .ep-server-name {
      font-weight: 200;
    }
  }
}
</style>
