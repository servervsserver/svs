import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Auth0Plugin } from "./auth";


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
