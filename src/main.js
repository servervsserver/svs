import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// =================================================
// Global imports that should be moved locally later
// =================================================

import EventCountdown from './components/countdown/DHMSCountdown.vue'
import ThemeSwitch from './components/ThemeSwitch.vue'
import BulkEdit from './components/layout/BulkEdit.vue'
import Tooltip from './components/Tooltip.vue'

Vue.component('event-countdown', EventCountdown)
Vue.component('theme-switch', ThemeSwitch)
Vue.component('bulk-edit', BulkEdit)
Vue.component('tooltip', Tooltip)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
