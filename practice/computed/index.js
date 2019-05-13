import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <span>name: {{name}}</span>
      <span>name: {{getName()}}</span>
      <p>{{number}}</p>
      <input type="text" v-model="number"/>
      <p>{{obj.a}}</p>
      <input type="text" v-model="obj.a"/>
    </div>
  `,
  data: {
    firstName: 'W',
    lastName: 'ciel',
    number: 0,
    obj: {
      a: 123
    }
  },
  watch: {
    // obj: {
    //   handler () {
    //     console.log('obj.a changed')
    //   }, // 默认是obj赋值的时候才会监听到，改内部的属性无法检测到
    //   immediate: true, // 会立马执行一遍handler,如不声明，只会在下次有变化的时候才执行
    //   deep: true // 会一层层的遍历obj内部属性，一旦有变化就会提交给handler
    // }
    'obj.a': {
      handler () {
        console.log('obj.a changed')
      }, // 默认是obj赋值的时候才会监听到，改内部的属性无法检测到
      immediate: true
    } // 不要在内部改动监听的值，不然会出现无限循环
  }, // 适用于监听到一个值的变化
  computed: {
    name () {
      console.log('computed new name')
      return `${this.firstName}${this.lastName}`
    }
  }, // 使用computed的好处：性能开销比较小，没有更新name的情况下有缓存，而在methods里的方法，每次数据改变都会调用
  methods: {
    getName () {
      // console.log('new name')
      return `${this.firstName}${this.lastName}`
    }
  }
})
