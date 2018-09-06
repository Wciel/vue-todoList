<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么"
      @keyup.enter="addTodo"
    />
    <Item
      v-for="todo in filteredCompleted"
      :key="todo.id"
      :todo="todo"
      :isActive="isActive"
      @del="deleteTodo"
    ></Item>
    <Tabs
      :todos="todos"
      :filter="filter"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted"
      ></Tabs>
    <router-view></router-view>
  </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'

let id = 0
export default {
  props: ['id'],
  data () {
    return {
      todos: [],
      filter: 'all',
      isActive: true
    }
  },
  components: {
    Item,
    Tabs
  },
  mounted () {
    console.log(this.id)
  },
  computed: {
    filteredCompleted () {
      // console.log(this.filter)
      if (this.filter === 'all') return this.todos
      const completed = this.filter === 'completed'
      return this.todos.filter((todo) => todo.completed === completed)
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(), // trim去掉前后空格
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo (id) {
      let index = this.todos.findIndex((todo) => todo.id === id)
      console.log(index)
      this.todos.splice(index, 1)
    },
    toggleFilter (state) {
      this.filter = state
      if (state === 'all') {
        this.isActive = true
      } else {
        this.isActive = false
      }
    },
    clearAllCompleted () {
      this.todos = this.todos.filter((todo) => !todo.completed)
    }
  }
}
</script>
<style lang="stylus" scoped>
    .real-app {
        width 700px
        margin 0 auto
        box-shadow 0 0 5px #666
    }
    .add-input {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        box-sizing: border-box;
        font-smoothing: antialiased;
        padding: 16px 16px 16px 36px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    }
</style>
