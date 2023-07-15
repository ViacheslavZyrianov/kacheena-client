import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from '@/plugins/axios'
import i18n from '@/plugins/i18n/index'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

require('@/plugins/portal')

Vue.config.productionTip = false

store.axios = axios

const app = new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
})

app.$mount('#app')
