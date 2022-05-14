import Admin from '@/views/admin/layout/Admin.vue'
import AdminSublevel from '@/views/admin/layout/AdminSublevel.vue'

// General administration
import Dashboard from '@/views/admin/general/Dashboard.vue'
import AnonymousConcerns from "@/views/admin/general/AnonymousConcerns.vue"
import ServerList from "@/views/admin/general/ServerList.vue"

// SvS IV administration
import EpUpload from "@/views/admin/svs-iv/EpUpload.vue"
import ThemeList from "@/views/admin/svs-iv/ThemeList.vue"
import AwardsList from "@/views/admin/svs-iv/AwardsList.vue"
import AwardCreation from "@/views/admin/svs-iv/AwardCreation.vue"

// Dev administration
import AdminForDev from "@/views/admin/AdminForDev.vue"


export const ADMIN_ROUTES = [
  {
    path: 'svs',
    name: 'SvS Administration',
    component: AdminSublevel,
    meta: {
      title: "SvS"
    },
    children: [
      {
        path: 'ep-upload',
        name: 'SvSIVEpUploadAdmin',
        component: EpUpload,
        meta: {
          title: "Ep Upload",
        }
      },
      {
        path: 'themes',
        name: 'ThemeList',
        component: ThemeList,
        meta: {
          title: "Theme list",
        }
      },
      {
        path: 'awards/list',
        name: 'AwardsListAdmin',
        component: AwardsList,
        meta: {
          title: "Awards list"
        }
      },
      {
        path: 'awards/create',
        name: 'AwardCreationAdmin',
        component: AwardCreation,
        meta: {
          title: "Awards creation"
        }
      }
    ]
  },
  {
    path: 'general',
    name: 'General Administration',
    component: AdminSublevel,
    meta: {
      title: "General"
    },
    children: [
      {
        path: 'dashboard',
        name: 'DashboardAdmin',
        component: Dashboard,
        meta: {
          title: "Dashboard",
        }
      },
      {
        path: 'anonymous-concerns',
        name: 'AnonymousConcernsAdmin',
        component: AnonymousConcerns,
        meta: {
          title: "Anonymous Concerns"
        }
      },
      {
        path: 'servers',
        name: 'ServerListAdmin',
        component: ServerList,
        meta: {
          title: "Servers"
        }
      }
    ]
  },
  {
    path: 'for-devs',
    name: 'Administration For Devs',
    component: AdminForDev,
    meta: {
      title: "AdminForDev"
    }
  },
  // {
  //   path: 'dashboard',
  //   name: 'DashboardAdmin',
  //   component: Dashboard,
  //   meta: {
  //     title: "Dashboard",
  //   }
  // },
  // {
  //   path: 'servers',
  //   name: 'ServerListAdmin',
  //   component: ServerList,
  //   meta: {
  //     title: "Servers"
  //   }
  // },

  // {
  //   path: 'themes',
  //   name: 'ThemeList',
  //   component: ThemeList,
  //   meta: {
  //     title: "ThemeList"
  //   }
  // },
  // {
  //   path: 'anonymous-concerns',
  //   name: 'AnonymousConcernsAdmin',
  //   component: AnonymousConcerns,
  //   meta: {
  //     title: "Anonymous Concerns"
  //   }
  // },

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
