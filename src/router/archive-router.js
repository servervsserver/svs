import Archive from '@/views/archive/Archive.vue'
import ArchiveTim from '@/views/archive/ArchiveTim.vue'
import CatalogArchive from "@/views/archive/Catalog.vue"

export const ARCHIVE_ROUTES = [
  {
    path: 'tim',
    name: 'TimArchive',
    component: ArchiveTim,
    meta: {
      title: 'Tim\'s Archives'
    }
  },
  {
    path: 'catalog',
    name: 'CatalogArchive',
    component: CatalogArchive,
    meta: {
      title: 'Catalog'
    }
  }
]

function createArchiveBlockRouter(path) {
  return {
    path: path,
    name: "Archives",
    component: Archive,
    children: ARCHIVE_ROUTES
  }
}

export function addArchiveBlockToRoutes(routes, path) {
  if (!path) path = "/archives"
  routes.push(createArchiveBlockRouter(path))
}
