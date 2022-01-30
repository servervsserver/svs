import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// =================================================
// Global imports that should be moved locally later
// =================================================

import EventCountdown from './components/countdown/DHMSCountdown.vue'
Vue.component('event-countdown', EventCountdown)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
