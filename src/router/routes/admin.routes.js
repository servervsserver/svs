import Admin from '@/views/admin/Admin.vue'

import Dashboard from '@/views/admin/Dashboard.vue'
import AnonymousConcerns from "@/views/admin/AnonymousConcerns.vue"
import ServerList from "@/views/admin/ServerList.vue"
import ThemeList from "@/views/admin/ThemeList.vue"


import store from '@/store'

export const ADMIN_ROUTES = [
  {
    path: 'dashboard',
    name: 'DashboardAdmin',
    component: Dashboard,
    meta: {
      title: "Dashboard",
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
    path: 'themes',
    name: 'ThemeList',
    component: ThemeList,
    meta: {
      title: "ThemeList"
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
    component: Admin,
    children: ADMIN_ROUTES,
    meta: {
      requiresAdmin: true
    }
  }
}

export function addAdminBlockToRoutes(routes, path) {
  if (!path) path = "/admin"
  routes.push(createAdminBlockRouter(path))
}
