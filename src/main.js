import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element'
import  './plugins/mkdown'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/base.css'

import $http from "./http/index"

Vue.prototype.$http = $http

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
