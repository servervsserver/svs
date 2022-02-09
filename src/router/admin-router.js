import Admin from '../views/admin/Admin.vue'
import Dashboard from '../views/admin/Dashboard.vue'

const ADMIN_ROUTES = [
  {
    path: 'dashboard',
    name: 'Dashboard',
    component: Dashboard
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
