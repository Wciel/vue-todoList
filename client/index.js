import Vue from 'vue'
import App from './app.vue'
import Vuex from 'vuex'
import createStore from './store/store'
import VueRouter from 'vue-router'

import './assets/styles/global.styl'
import createRouter from './config/router'

Vue.use(VueRouter) // 使用vue.use使之后的组件都能拿到router对象

const router = createRouter()
console.log(router)

Vue.use(Vuex)

const store = createStore()
store.registerModule('c', {
  state: {
    text: 'im modules c'
  }
}) // vuex动态注册模块

store.watch((state) => state.count + 1, (newCounter) => {
  console.log('new count watched', newCounter)
}) // store里面的count改变了，第二个回调函数就会调用

store.subscribe((mutation, state) => {
  console.log(mutation.type)
  console.log(mutation.payload)
}) // 当执行了store里面的mutation,就会使用这个回调函数，监听到Mutation的type和值

store.subscribeAction((action, state) => {
  console.log(action.type)
  console.log(action.payload)
})
const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  store,
  render: (h) => h(App) // 这里只是渲染出来了app的内容
}).$mount(root) // 挂载到root里面
// 下面的全局路由的钩子函数，每次路由跳转以下三个都会被触发
// router.beforeEach((to, from, next) => {
//   console.log(to.fullPath)
//   // if (to.fullPath === '/app') {
//   //   next('/login')
//   // } else {
//   //   console.log('hhh')
//   //   next()
//   // }
// })
// router.beforeResolve((to, from, next) => {
//   console.log('before rosolve invoked')
//   next()
// })
// router.afterEach((to, from) => {
//   console.log('before rosolve invoked')
// }) // 每次跳转之后再触发
new Vue({
  router, // 在根节点里面使用router之后，在之后的组件里面都可以拿到router对象(vue provide)
  render: (h) => h(App)
}).$mount('#root') // 挂载到root里面
