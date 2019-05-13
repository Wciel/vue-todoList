import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: Number,
    onChange: {
      onChange: Function,
      required: true
    }
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
  },
  update () {
    console.log(this.props)
  }
}

// Vue.component('CompOne', component) // 全局的component

new Vue({
  el: '#root',
  components: {
    CompOne: component
  },
  template: `
    <div>
      <comp-one ref="comp1" :active="active" :prop-one="prop1" :onChange="handleChange" @change="handleChange"></comp-one>
      <comp-one :active="!active" :prop-one="prop1" @change="handleChange"></comp-one>
    </div>
  `, // no : 传进去的是字符串
  data: {
    active: false,
    prop1: 0
  },
  methods: {
    handleChange () {
      this.prop1 += 1
    }
  },
  mounted () {
    console.log(this.$refs.comp1) // 得到的是vue实例
  }
})
