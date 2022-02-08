import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Auth0Plugin } from "./auth";

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

import { date } from "./filters/date"

Vue.filter('date', date)

Vue.config.productionTip = false

let domain = process.env.VUE_APP_AUTH0_DOMAIN;
let clientId = process.env.VUE_APP_AUTH0_CLIENT_ID;

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
