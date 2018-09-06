<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p>{{count}}hellp</p>
    <Footer></Footer>
    <Todo></Todo>
  </div>

</template>

<script>
import Header from './lagout/header.vue'
import Footer from './lagout/footer.jsx'
import Todo from './views/todo/todo.vue'
// console.log(Header.__docs)
export default {
  components: {
    Header,
    Footer,
    Todo
  },
  mounted () {
    console.log(this.$store) // 每个组件内部都会加上$store这个对象，指向的就是Vue入口的store
    // let i = 0
    // setInterval(() => {
    //   this.$store.commit('updateCount', i++)
    // }, 1000)
    // this.$store.commit('updateCount', i++)
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
</script>

<!-- 设置scoped 表示当前组件下的id只在当前组件起作用，不会跟其他组件引起冲突 -->
<style lang="stylus" scoped>
    #app {
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    }
    #cover {
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color #555
        opacity 0.5
        z-index -1
    }
</style>
