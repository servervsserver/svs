import AlbumPage from "../pages/AlbumPage.vue"
import TrackPage from "../pages/TrackPage.vue"

export const routes = [
  {
    path: 'collection',
    name: 'CatalogCollection',
    component: () => AlbumPage,
    meta: {
      title: 'Collection'
    }
  },
  {
    path: 'album/:id',
    name: 'CatalogAlbum',
    component: AlbumPage,
    meta: {
      title: 'Album'
    }
  },
  {
    path: 'track/:id',
    name: 'CatalogTrack',
    component: TrackPage,
    meta: {
      title: 'Track'
    }
  }
]