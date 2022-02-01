import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Vote from '../views/vote.vue'
import About from '../views/About.vue'

import MainEvent from '../views/main-event/MainEvent.vue'
import ServerApplication from '../views/main-event/ServerApplication.vue'
import CodeOfConduct from '../views/main-event/CodeOfConduct.vue'
import Rules from '../views/main-event/Rules.vue'

import ServerProfile from '../views/server/ServerProfile.vue'

import Admin from '../views/admin/Admin.vue'
import Dashboard from '../views/admin/Dashboard.vue'

import PageNotFound from '../views/PageNotFound.vue'

/* ===== Test vues ===== */

import MainTest from '../views/test-views/MainTest.vue'
import TractTest from '../views/test-views/TrackTest.vue'

Vue.use(VueRouter)

// TODO: Should be done in an auth plugin
const isAdmin = false

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
        path: 'server-application',
        component: ServerApplication
      },
      {
        path: 'code-of-conduct',
        component: CodeOfConduct
      },
      {
        path: 'rules',
        component: Rules
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
      console.log('Trying to pass the admin guard')
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
    path: '/test',
    name: 'Test',
    component: MainTest,
    children: [
      {
        path: 'track',
        name: 'Track',
        component: TractTest
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: About
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '*',
    name: '404',
    component: PageNotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
