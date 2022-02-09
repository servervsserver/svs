import Archive from '../views/archive/Archive.vue'

function createArchiveBlockRouter(path) {
  return {
    path: path,
    name: "Archives",
    component: Archive,
    children: []
  }
}

export function addArchiveBlockToRoutes(routes, path) {
  if (!path) path = "/archives"
  routes.push(createArchiveBlockRouter(path))
}
