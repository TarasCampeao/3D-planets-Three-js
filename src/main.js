// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import VueRouter from 'vue-router'
import router from './routes'
import ErrorPage from './components/ErrorPage'
import store from './store/index.js'


Vue.config.productionTip = false;

Vue.use(VueRouter)
//Vue.use(Vuex)

Vue.component('error-page', ErrorPage)


new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
});