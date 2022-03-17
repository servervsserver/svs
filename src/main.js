import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BackendPlugin, SettingsPlugin, AuthPlugin, CharityPlugin } from "./plugins/all"

import PreOpening from "./components/PreOpening.vue"
import ComingSoon from "./components/ComingSoon.vue"
import NotOpenYet from "./components/NotOpenYet.vue"
import BrandName from './components/branding/BrandName.vue'
import BrandNameShort from './components/branding/BrandNameShort.vue'
Vue.component('pre-opening', PreOpening)
Vue.component('coming-soon', ComingSoon)
Vue.component('not-open-yet', NotOpenYet)
Vue.component('brand-name', BrandName)
Vue.component('brand-name-short', BrandNameShort)

const VueCookie = require('vue-cookie');
Vue.use(VueCookie);


// =================================================
// Global imports that should be moved locally later
// =================================================

import EventCountdown from './components/countdown/DHMSCountdown.vue'
import ThemeSwitch from './components/ThemeSwitch.vue'
import BulkEdit from './components/layout/BulkEdit.vue'
import Drawer from './components/layout/Drawer.vue'
import Tooltip from './components/Tooltip.vue'
import SquaredImageContainer from './components/SquaredImageContainer.vue'

Vue.component('event-countdown', EventCountdown)
Vue.component('theme-switch', ThemeSwitch)
Vue.component('bulk-edit', BulkEdit)
Vue.component('drawer', Drawer)
Vue.component('tooltip', Tooltip)
Vue.component('squared-image-box', SquaredImageContainer)

// =================================================
// Global imports of filters
// =================================================

import { fileSize } from "./filters/file"
import { date, duration } from "./filters/date"
import { discordInviteHandle } from "./filters/discord"

Vue.filter('date', date)
Vue.filter('duration', duration)
Vue.filter('discordInviteHandle', discordInviteHandle)
Vue.filter('fileSize', fileSize)

// =================================================
// Global import directives
// =================================================

import VueClipboards from 'vue-clipboards';

Vue.use(VueClipboards);

Vue.config.productionTip = false

Vue.use(BackendPlugin);
Vue.use(SettingsPlugin);
Vue.use(AuthPlugin);
Vue.use(CharityPlugin);

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
