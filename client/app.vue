<template>
  <div id="app">
    <div id="cover">

    </div>
    <Header></Header>
    <!-- <Todo></Todo> -->
    <router-link to="/app">app</router-link>
    <router-link to="/login">logindhelas</router-link>
    <transition name="fade">
      <router-view />  <!-- 路径是什么，就显示什么 -->
    </transition>
    <Footer></Footer>
    <!-- <router-view name="a"/> -->
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
    console.log(this.$route)
    console.log(this.$route.query)
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
