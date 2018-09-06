import Router from 'vue-router'

import routes from './routes'

// const router = new Router({
//   routes
// })

export default () => {
  return new Router({
    routes,
    mode: 'history', // 默认的是hash'#'
    // base: '/base/', // 在所有的path前都会加上/base/
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link', // 完全匹配的时候才会加上exact-active-link这个class
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    // parseQuery (query) {}, // 将参数转换成obj对象
    // stringifyQuery (query) {}, // 将参数转换成字符串对象
    fallback: false
  })
} // 这样每次都return一个新router, ssr的时候会出现内存溢出的问题
