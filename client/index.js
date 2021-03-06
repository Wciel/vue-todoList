import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import './assets/styles/global.styl'
import createRouter from './config/router'

Vue.use(VueRouter) // 使用vue.use使之后的组件都能拿到router对象

const router = createRouter()
console.log(router)

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
