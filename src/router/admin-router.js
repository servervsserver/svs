import Admin from '../views/admin/Admin.vue'
import Dashboard from '../views/admin/Dashboard.vue'

import AnonymousConcerns from "../views/admin/AnonymousConcerns.vue"
import ServerList from "../views/admin/ServerList.vue"


import store from '@/store'

export const ADMIN_ROUTES = [
  {
    path: 'dashboard',
    name: 'DashboardAdmin',
    component: Dashboard,
    meta: {
      title: "Dashboard"
    },
    beforeEnter: (to, from, next) => {
      let isAdmin = store.getters.isAdmin;
      if (isAdmin) { next() }
        else { return { name: 'Home' } }
  }
  },
{
  path: 'servers',
    name: 'ServerListAdmin',
      component: ServerList,
        meta: {
    title: "Servers"
  },
  beforeEnter: (to, from, next) => {
    let isAdmin = store.getters.isAdmin;
    if (isAdmin) { next() }
      else { return { name: 'Home' } }
  }
},
{
  path: 'anonymous-concerns',
    name: 'AnonymousConcernsAdmin',
      component: AnonymousConcerns,
        meta: {
    title: "Anonymous Concerns"
  },
  beforeEnter: (to, from, next) => {
    let isAdmin = store.getters.isAdmin;
     if (isAdmin) { next() }
      else { return { name: 'Home' } }
  }
}
]

function createAdminBlockRouter(path) {
  return {
    path: path,
    name: "Admin",
    component: Admin,
    children: ADMIN_ROUTES
  }
}

export function addAdminBlockToRoutes(routes, path) {
  if (!path) path = "/admin"
  routes.push(createAdminBlockRouter(path))
}
