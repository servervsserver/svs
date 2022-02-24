import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CodeOfConduct from '../views/CodeOfConduct.vue'
import Vote from '../views/vote.vue'
import AnonymousConcerns from "../views/AnonymousConcerns.vue"
import About from '../views/About.vue'
import CookiePolicy from '../views/CookiePolicy.vue'

import MainEvent from '../views/main-event/MainEvent.vue'
import MainEventOverview from "../views/main-event/MainEventOverview.vue"
import Rules from '../views/main-event/Rules.vue'
import ServerApplication from '../views/main-event/ServerApplication.vue'
import EpUpload from "../views/main-event/EpUpload.vue"

import ServerProfile from '../views/server/ServerProfile.vue'

import ProfileTest from '../views/Profile.vue'

import PageNotFound from '../views/PageNotFound.vue'

/* ===== Test vues ===== */

import { addTestBlockToRoutes } from "./router.dev.js"
import { addAdminBlockToRoutes } from "./admin-router.js"
import { addArchiveBlockToRoutes } from "./archive-router.js"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/cookie-policy',
    name: 'CookiePolicy',
    component: CookiePolicy
  },
  {
    path: '/vote',
    name: 'Vote',
    component: Vote
  },
  {
    path: '/code-of-conduct',
    name: 'CodeOfConduct',
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
        name: 'ServerApplication',
        component: ServerApplication
      },
      {
        path: 'rules',
        name: 'Rules',
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
    path: '/anonymous-concerns/:id?',
    name: 'AnonymousConcerns',
    component: AnonymousConcerns
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileTest
  },
  {
  path:'/invite',
  component: null,
    beforeEnter(to, from, next) {
      window.location.href = "https://discord.gg/8wsGFwxT5S";
    }
  }
]

addArchiveBlockToRoutes(routes)
addAdminBlockToRoutes(routes)
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (!admin) {
      next()
    } else {
      next()
    }
  } else {
    next()
  }
})


export default router
