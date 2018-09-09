<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p>{{fullName}}</p>
    <p>{{textA}}hellp</p>
    <p>{{textC}}</p>
    <Footer></Footer>
    <Todo></Todo>
  </div>

</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
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
    console.log(this.$store.getters.fullName)
    this.updateCountAsync({
      num: 5,
      time: 2000
    })
    // this.updateText('123')
    this.updateText('123')
    console.log('textPlus', this.textPlus)
    console.log('a/actions/add', this['a/add']())
  },
  computed: {
    // count () {
    //   return this.$store.state.count
    // },
    // fullName () {
    //   return this.$store.getters.fullName
    // },
    ...mapGetters({
      'fullName': 'fullName',
      'textPlus': 'a/textPlus'
    }),
    ...mapState({
      count: (state) => state.count,
      textC: (state) => state.c.text
    }),
    textA () {
      return this.$store.state.a.text
    }
  },
  methods: {
    ...mapActions(['updateCountAsync', 'a/add']),
    // ...mapMutations(['updateCount', 'a/updateText'])
    ...mapMutations({
      'updateCount': 'updateCount',
      'updateText': 'a/updateText'
    })
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
