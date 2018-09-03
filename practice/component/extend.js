import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: {
      propOne: Number
    },
    onChange: Function
  },
  // props: ['active', 'propOne', 'onChange'], // 这样相对来说不太严谨
  template: `
    <div>This is component{{text}}
      <input type="text" v-model="text"/>
      <span v-show="active">can you see me</span>
      <span>{{propOne}}</span>
      <p @click="handleCLick">{{propOne}}</p>
      <p @click="handleCLicko">{{propOne}}</p>
    </div>
  `,
  data () {
    return {
      text: 123
    }
  }, // return的必须是新建的对象，不能是全局的对象
  methods: {
    handleCLick () {
      console.log('hello')
      this.onChange()
    },
    handleCLicko () {
      this.$emit('change')
    }
  }
  // update () {
  //   console.log(this.props)
  // }
}

Vue.component('CompOne', component) // 全局的component
const component2 = {
  extends: component,
  props: {
    name: String
  },
  data () {
    return { text: 56 }
  },
  template: `
    <div>
      <p>hello world{{text}}</p>
      <p>父组件的值是{{name}}</p>
      <button @click="handleClick">点击</button>
    </div>
  `,
  methods: {
    handleClick () {
      this.handleCLicko()
    } // 继承之后可以使用父组件的方法
  },
  mounted () {
    console.log(this.$parent.name) // 可以获取使用改组件的组件的值即可以用this.$parent方法
  }

}

new Vue({
  name: 'ciel',
  el: '#root',
  components: {
    CompOne: component,
    CompTwo: component2
  },
  template: `
    <div>
      <comp-one ref="comp1" :active="active" :prop-one="prop1" :onChange="handleChange" @change="handleChange"></comp-one>
      <comp-one :active="!active" :prop-one="prop1" @change="handleChange" :onChange="handleChange"></comp-one>
      <p>下面就是component2了</p>
      <comp-two :name="name" @change="handleChange"></comp-two>
     </div>
  `, // no : 传进去的是字符串
  data: {
    active: false,
    prop1: 0,
    name: 'ciel'
  },
  methods: {
    handleChange () {
      this.prop1 += 1
    }
  }
  // mounted () {
  //   console.log(this.$refs.comp1) // 得到的是vue实例
  // }
})
