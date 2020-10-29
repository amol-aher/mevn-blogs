// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Notifications from 'vue-notification'
import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'
import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js'
Vue.component('vue-simplemde', VueSimplemde)

const baseConnection = axios.create({
  baseURL: 'http://localhost:8081'
})
Vue.prototype.$http = baseConnection

Vue.config.productionTip = false

Vue.use(Notifications)
window.hljs = hljs

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
