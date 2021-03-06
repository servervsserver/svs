import Vue from 'vue'
import VueRouter from 'vue-router'

// import createAdminGuard from "./guards/admin.guard.js"
import { AuthGuard } from "./guards/auth.guard.js"
import { AdminGuard } from './guards/admin.guard.js'

import { routes } from "./routes"
import { navbarContent, populateNavbar } from "./navbar"

export { routes } from "./routes"
export { navbarContent } from "./navbar"

populateNavbar(routes, navbarContent)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return {
      x: 0,
      y: 0,
      behavior: 'smooth'
    }
  }
})

Vue.use(VueRouter)

new AuthGuard().registerTo(router)
new AdminGuard().registerTo(router)
// router.beforeEach(createAuthGuard(router))
// router.beforeEach(createAdminGuard(router))

export default router
