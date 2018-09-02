import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: 'aaa'
  },
  beforeCreate () {
    console.log(this.$el, 'beforeCreated')
  },
  created () {
    console.log(this.$el, 'created') // $el = undefinded
  },
  beforeMount () {
    console.log(this, 'beforeMount') // $el = <div #root
  },
  mounted () {
    console.log(this, 'mounted')
  },
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated () {
    console.log(this, 'updated')
  },
  activated () {
    console.log(this, 'activated') // 与组件有关，在组件章节讲解
  },
  deactivated () {
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  },
  renderError (h, err) {
    return h('div', {}, err.stack)
  },
  errorCaptured () {
    // 会向上冒泡，并且正式环境可以使用,可以捕获子组件的错误
  }
})

app.$mount('#root')

setTimeout(() => {
  app.$destroy() // 组件销毁的一个方法，主动去销毁事件监听和watch
}, 500)
// 在beforecreate阶段不要去修改data里面的数据
// render方法是在beforeMount和mounted之间去执行的
