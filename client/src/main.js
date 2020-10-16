// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueTimeago from 'vue-timeago'
import VueSimplemde from 'vue-simplemde'

import 'bootstrap'
import 'simplemde/dist/simplemde.min.css'

// Layouts
import AdminLayout from '@/views/layouts/Admin'
import AuthLayout from '@/views/layouts/Auth'
import FrontendLayout from '@/views/layouts/Frontend'

Vue.component('admin-layout', AdminLayout)
Vue.component('auth-layout', AuthLayout)
Vue.component('frontend-layout', FrontendLayout)
Vue.component('vue-simplemde', VueSimplemde)

Vue.use(VueTimeago, { name: 'Timeago', locale: 'en' })

// EventBus
import { EventBus } from '@/services/eventService'
Vue.prototype.$eventBus = EventBus

// Axios
import axios from 'axios'
const baseConnection = axios.create({
  baseURL: 'http://localhost:8081'
})
Vue.prototype.$http = baseConnection

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
