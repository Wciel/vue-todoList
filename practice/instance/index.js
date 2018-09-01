import Vue from 'vue'

const app = new Vue({
  el: '#root', // in ../build/tempalte.html
  template: '<div ref="div">{{num}} {{obj.a}}</div>',
  data: {
    text: 'this is content',
    num: 0,
    obj: {}
  },
  watch: {
    num: (newText, oldText) => {
      console.log(`${newText}:${oldText}`)
    }
  } // 用这种方式写会自动注销
})

// let i = 0
// setInterval(() => {
//   i++
//   // app.num += 1
//   // app.obj.a = i // 这样做是非响应式的
//   // app.$forceUpdate() // 强制刷新来达到响应
//   app.$set(app.obj, 'a', i) // 通过设置值来达到响应式,相当于在data的obj里面补上了a属性
//   // app.$delete删除刚刚设置的属性
// }, 1000)

// app.$data //与实例中的data是同一个引用
// app.$props //父组件传进来的值
// app.$el //根节点
// app.$options以上所有的集合
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }
// console.log(app.$root === app) // true
// console.log(app.$children)
// console.log(app.$scopedSlots)
// console.log(app.$refs)
// console.log(app.$isServer) // 在服务端渲染去运行的时候会用到

// const unWatch = app.$watch('num', (newText, oldText) => {
//   console.log(`${newText}:${oldText}`)
// })
// setTimeout(() => {
//   unWatch()
// }, 2000)

// app.$on('test', () => {
//   console.log('test emited')
// })
app.$once('test', () => {
  console.log('hello')
}) // triggered only once

app.$emit('test') // 你监听的是这个vue对象，那么你必须通过这个vue对象去触发，它才会监听得到

app.$forceUpdate() // 强制刷新一次
/* app.$nextTick([callback])
  实时响应，因为每次data变化之后，不会立即在页面上渲染出来，而是放在异步队列里面，几次变化之后才渲染出来来 */
