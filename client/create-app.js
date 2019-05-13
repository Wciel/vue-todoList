import Vue from 'vue'
import Vuex from 'vuex'
import App from './app.vue'
import createStore from './store/store'
import createRouter from './config/router'
import Meta from 'vue-meta'
import './assets/styles/global.styl'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)
export default () => {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
} // 服务端渲染每次都要创建新的路由，store防止内存溢出
