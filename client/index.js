import Vue from 'vue'
import App from './app.vue'


import './assets/styles/global.styl'

const root = document.createElement('div')
document.body.appendChild(root)
new Vue({
  render: (h) => h(App) //这里只是渲染出来了app的内容
}).$mount(root) //挂载到root里面