import Admin from '../views/admin/Admin.vue'
import Dashboard from '../views/admin/Dashboard.vue'

import AnonymousConcerns from "../views/admin/AnonymousConcerns.vue"
import ServerList from "../views/admin/ServerList.vue"

export const ADMIN_ROUTES = [
  {
    path: 'dashboard',
    name: 'DashboardAdmin',
    component: Dashboard,
    meta: {
      title: "Dashboard"
    }
  },
  {
    path: 'servers',
    name: 'ServerListAdmin',
    component: ServerList,
    meta: {
      title: "Servers"
    }
  },
  {
    path: 'anonymous-concerns',
    name: 'AnonymousConcernsAdmin',
    component: AnonymousConcerns,
    meta: {
      title: "Anonymous Concerns"
    }
  }
]

function createAdminBlockRouter(path) {
  return {
    path: path,
    name: "Admin",
    requiresAdmin: true,
    component: Admin,
    children: ADMIN_ROUTES
  }
}

export function addAdminBlockToRoutes(routes, path) {
  if (!path) path = "/admin"
  routes.push(createAdminBlockRouter(path))
}
