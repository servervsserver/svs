function findRouteMatchingName(name, routes) {
  let res = routes.find(route => name === route.name)
  if (res) return res
  for(let route of routes) {
    if (route.children) {
      let res = findRouteMatchingName(name, route.children)
      if (res) return res
    }
  }
  return null
}

let _vuid = 0
function populateNavbarItem(routes, item, parent) {
  item._vueid = _vuid += 1
  const name = item.name
  const route = findRouteMatchingName(name, routes)
  console.log(route, item)
  item.to = route.path
  if (parent) {
    item.to = parent.to.replace(/[\\\/]+$/g) + "/" + item.to.replace(/^[\\\/]+/g)
  }
  item.display = item.display || (route.meta ? route.meta.title : null) || item.name

  if (route.meta) {
    if (route.meta.requiresAdmin) {
      item.requiresAdmin = true
    }
  }

  if (!item.children) return
  for (let child of item.children) {
    populateNavbarItem(routes, child, item)
  }
}

export function populateNavbar(routes, navbarContent) {
  for (let item of navbarContent) {
    populateNavbarItem(routes, item)
  }
}
