<template>
  <div id="app">
    <div id="cover">

    </div>
    <Header></Header>
    <!-- <Todo></Todo> -->
    <router-link to="/app/123">app</router-link>
    <router-link to="/login">login</router-link>
    <transition name="fade">
      <router-view />  <!-- 路径是什么，就显示什么 -->
    </transition>
    <Footer></Footer>
     <router-view name="newName"/>
  </div>

</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'
// console.log(Header.__docs)
export default {
  props: ['id'],
  components: {
    Header,
    Footer,
    Todo
  },
  data () {
    return {
      name: this.id
    }
  },
  // mounted () {
  //   console.log('id', this.id)
  // },
  updated () {
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
