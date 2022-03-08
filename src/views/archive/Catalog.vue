<template>
  <section>
    <h1>Catalog</h1>
    <section class="ep-collection columns is-multiline">
      <div
        v-for="ep of allEps"
        :key="ep.id"
        class="ep-block column is-2"
      >
        <div class="ep-block-content">
          <squared-image-box>
            <img class="cover-art" :src="ep.coverArtUri" />
          </squared-image-box>
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

let catalog = new ArchiveCatalog()
catalog.addEp(new ArchiveEp("1","1","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
catalog.addEp(new ArchiveEp("2","1","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
catalog.addEp(new ArchiveEp("3","1","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
catalog.addEp(new ArchiveEp("4","1","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
catalog.addEp(new ArchiveEp("5","1","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
catalog.addEp(new ArchiveEp("5","1","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
catalog.addEp(new ArchiveEp("13","1","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
catalog.addEp(new ArchiveEp("14","1","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
catalog.addEp(new ArchiveEp("15","1","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
catalog.addEp(new ArchiveEp("15","1","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))


export default {
  data() {
    return {
      catalog: catalog
    }
  },
  computed: {
    allEps() {
      console.log(catalog)
      console.log("All eps", this.catalog.getAllEps())
      return this.catalog.getAllEps()
    }
  }
}
</script>
