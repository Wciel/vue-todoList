import Vue from 'vue'
import App from './app.vue'
import Vuex from 'vuex'
import createStore from './store/store'
import './assets/styles/global.styl'

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
