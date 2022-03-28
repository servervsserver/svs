<template>
  <section>
    <h1>Catalog</h1>
    <section
      v-if="catalogLoading"
      class="ep-collection-loading"
    />
    <section
      v-if="!catalogLoading"
      class="ep-collection columns is-multiline is-mobile"
    >
      <div
        v-for="ep of allEps"
        :key="ep.id"
        class="column is-2-desktop is-3-tablet is-6-mobile"
      >
        <album-block :album="ep" @onclick="onAlbumClick"/>
      </div>
    </section>
  </section>
</template>

<script>

import * as Archive from "@/modules/catalog/models"
import AlbumBlockComponent from '@/modules/catalog/components/AlbumBlock.vue'

export default {
  components: {
    'album-block': AlbumBlockComponent
  },
  data() {
    return {
      catalog: null,
      catalogLoading: true,
      allEps: []
    }
  },
  // computed: {
  //   allEps() {
  //     return this.catalog.getAllEps()
  //   }
  // },
  mounted() {
      let catalog = new Archive.Catalog()
      // catalog.addEp(new ArchiveEp("1","Server name","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
      // catalog.addEp(new ArchiveEp("2","Server name","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
      // catalog.addEp(new ArchiveEp("3","Server name","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
      // catalog.addEp(new ArchiveEp("4","Server name","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
      // catalog.addEp(new ArchiveEp("5","Server name","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
      // catalog.addEp(new ArchiveEp("5","Server name","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
      // catalog.addEp(new ArchiveEp("13","Server name","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
      // catalog.addEp(new ArchiveEp("14","Server name","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
      // catalog.addEp(new ArchiveEp("15","Server name","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))
      // catalog.addEp(new ArchiveEp("15","Server name","Title of EP", "https://picsum.photos/200?random=" + (Math.random() * 100000)))

      this.catalog = catalog
      this.catalogLoading = false
      this.getAllEps()
      this.getAllTracks()
  },
  methods: {
    async getAllEps() {
      let fAllEpsMap = await this.$svsBackend.getAllEps()
      for (let [id,fEp] of Object.entries(fAllEpsMap)) {
        let aEp = new Archive.Album(id, "Server name not given", fEp.name, fEp.coverart_url)
        this.catalog.addEp(aEp)
      }
      this.allEps = this.catalog.getAllEps()
    },
    async getAllTracks() {
      let fAllTracksMap = await this.$svsBackend.getAllTracks()
      for (let [id,fTrack] of Object.entries(fAllTracksMap)) {
        let aTrack = new Archive.Track(id, fTrack.name, fTrack.audiofile_url)
        this.catalog.addTrack(aTrack)
        console.log(aTrack, this.catalog)
      }
      console.log("get all eps", fAllTracksMap)
    },
    onAlbumClick(evt) {
      console.log(evt)
    }
  }

}
</script>

<style scoped lang='scss'>
// .ep-block {
//   .cover-art {
//     border-radius: 3px;
//     background: #333366;
//     box-shadow: 1px 2px 5px 0px #0004;
//   }
//   .ep-infos {
//     font-family: 'Jost';
//     padding: 5px;
//     .ep-name {
//       font-weight: 500;
//     }
//     .ep-server-name {
//       font-weight: 200;
//     }
//   }
// }
</style>
