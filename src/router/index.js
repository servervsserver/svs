import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CodeOfConduct from '../views/CodeOfConduct.vue'
import Vote from '../views/vote.vue'
import AnonymousConcerns from "../views/AnonymousConcerns.vue"
import About from '../views/About.vue'

import MainEvent from '../views/main-event/MainEvent.vue'
import MainEventOverview from "../views/main-event/MainEventOverview.vue"
import Rules from '../views/main-event/Rules.vue'
import ServerApplication from '../views/main-event/ServerApplication.vue'
import EpUpload from "../views/main-event/EpUpload.vue"

import Archive from '../views/Archive.vue'

import ServerProfile from '../views/server/ServerProfile.vue'

import Admin from '../views/admin/Admin.vue'
import Dashboard from '../views/admin/Dashboard.vue'

import PageNotFound from '../views/PageNotFound.vue'

/* ===== Test vues ===== */

import { addTestBlockToRoutes } from "./router.dev.js"



Vue.use(VueRouter)

// TODO: ADD ADMIN CHECK
/* So You can do this by using meta tags
  for stuff that needs to be login blocked add a meta : {requiresAuth : true}
  meta : {isAdmin : true}
  */
const isAdmin = false

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/archive',
    component: Archive
  },
  {
    path: '/vote',
    component: Vote
  },
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/code-of-conduct',
    component: CodeOfConduct
  },
  {
    path: '/server/:id',
    name: 'ServerProfile',
    component: ServerProfile
  },
  {
    path: '/main-event',
    name: 'MainEvent',
    component: MainEvent,
    children: [
      {
        path: 'overview',
        name: 'MainEventOverview',
        component: MainEventOverview
      },
      {
        path: 'server-application',
        component: ServerApplication
      },
      {
        path: 'rules',
        component: Rules
      },
      {
        path: 'ep-upload',
        name: 'EpUpload',
        component: EpUpload
      }
    ]
  },
  {
    path: '/server-application',
    name: 'ServerApplication',
    component: ServerApplication
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/dashboard',
    component: Admin,
    beforeEnter: (to, from, next) => {
      if (!isAdmin) {
        next('home')
      } else {
        next()
      }
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      }
    ]
  },
  {
    path: '/anonymous-concerns/:id?',
    name: 'AnonymousConcerns',
    component: AnonymousConcerns
  },
  // {
  //   path: '/anonymous-concerns/',
  //   name: 'AnonymousConcerns',
  //   component: AnonymousConcerns
  // },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

addTestBlockToRoutes(routes)

routes.push({ path: '*', name: '404', component: PageNotFound })

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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})


export default router
