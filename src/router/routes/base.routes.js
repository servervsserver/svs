import Home from '@/views/Home.vue'
import CodeOfConduct from '@/views/CodeOfConduct.vue'
import Vote from '@/views/vote.vue'
import AnonymousConcerns from "@/views/AnonymousConcerns.vue"
import About from '@/views/About.vue'
import CookiePolicy from '@/views/CookiePolicy.vue'
import FAQ from '@/views/Faq.vue'
import Download from '@/views/Download.vue'

import MainEvent from '@/views/main-event/MainEvent.vue'
import MainEventOverview from "@/views/main-event/MainEventOverview.vue"
import Rules from '@/views/main-event/Rules.vue'
import ServerApplication from '@/views/main-event/ServerApplication.vue'
import EpUpload from "@/views/main-event/EpUpload.vue"
import SvSIVRadio from "@/views/main-event/SvSIVRadio.vue"
import ThemeSubmit from "@/views/ThemeSubmit.vue"

import ServerProfile from '@/views/server/ServerProfile.vue'

import Profile from '@/views/Profile.vue'
import Servers from '@/components/Servers.vue'

import Charities from '@/components/Charities.vue'

import LoginCallback from '@/components/LoginCallback.vue'

const CALLBACK_PATH = '/login/callback'
const discord_client_id = process.env.VUE_APP_DISCORD_ID;
const url = encodeURIComponent(process.env.VUE_APP_CALLBACK_URL);

export const routes = [
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
    redirect: '/svs-iv',
  },
  {
    path: '/main-event/overview',
    redirect: '/svs-iv/overview',
  },
  {
    path: '/main-event/server-application',
    redirect: '/svs-iv/server-application',
  },
  {
    path: '/main-event/rules',
    redirect: '/svs-iv/rules',
  },
  {
    path: '/main-event/ep-upload',
    redirect: '/svs-iv/ep-upload',
  },
  {
    path: '/theme',
    redirect: 'svs-iv/theme'
  },
  {
    path: CALLBACK_PATH,
    name: 'callback',
    component: LoginCallback
  },
  {
    path: '/gabagool',
    name: "download",
    component: Download
  },
  {
    path: '/svs-iv',
    name: 'SvS IV',
    redirect: '/svs-iv/overview',
    component: MainEvent,
    children: [
      {
        path: 'overview',
        name: 'SvS IV Overview',
        component: MainEventOverview
      },
      // {
      //   path: 'server-application',
      //   name: 'SvS IV Server Application',
      //   component: ServerApplication
      // },
      {
        path: 'rules',
        name: 'SvS IV Rules',
        component: Rules
      },
      {
        path: 'radio',
        name: 'SvS IV Catalog',
        // component: SvSIVRadio
        redirect: '/catalog/collection/svs-iv'
      },
      {
        path: 'ep-upload',
        name: 'SvS IV EP Submission',
        component: EpUpload
      },
      {
        path: 'servers',
        name: 'SvS IV Participants',
        component: Servers
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
    path: '/charity',
    name: 'Charity',
    component: Charities
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQ
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/invite',
    component: null,
    beforeEnter(to, from, next) {
      window.location.href = "https://discord.gg/8wsGFwxT5S";
    }
  },
  {
    path: '/login',
    component: null,
    beforeEnter(to, from, next) {
      window.location.href = `https://discord.com/api/oauth2/authorize?response_type=token&client_id=${discord_client_id}&scope=identify&state=15773059ghq9183habn&redirect_uri=${url}&prompt=consent`
    }
  }
]
