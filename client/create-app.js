import Vue from 'vue'
import Vuex from 'vuex'
import App from './app.vue'
import createStore from './store/store'
import createRouter from '../config/router'
import './assets/styles/global.styl'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(Vuex)
export default () => {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
