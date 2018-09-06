import Vue from 'vue'
import App from './app.vue'
import Vuex from 'vuex'
import createStore from './store/store'
import './assets/styles/global.styl'

Vue.use(Vuex)

const store = createStore()
const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  store,
  render: (h) => h(App) // 这里只是渲染出来了app的内容
}).$mount(root) // 挂载到root里面
