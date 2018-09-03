import Vue from 'vue'

const childComponent = {
  template: `
    <div>
      <div>this is childComponent</div>
    </div>
  `,
  inject: ['yeye', 'value'], // 自组件使用父组件的provide
  mounted () {
    // console.log(this.$parent.$options.name)
    console.log('yeye value', this.yeye, this.value)
  }
}

const component = {
  name: 'ciel',
  components: {
    chlidComp: childComponent
  },
  props: {},
  template: `
    <div :style="style">
      <div className="header">
        <slot name="header" :contentOne="contentOne"></slot>
      </div>
      <div className="body">
        <slot name="body" :contentTwo="contentTwo"></slot>
      </div>
      <chlid-comp></chlid-comp>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid red'
      },
      contentOne: 'contentOne',
      contentTwo: 'contentTwo'
    }
  },
  mounted () {
    console.log(this.$parent.$options.jack)
  }
}

new Vue({
  jack: 'jack',
  components: {
    compOne: component
  },
  el: '#root',
  template: `
   <comp-one ref="comp">
    <span slot="header" slot-scope="props" ref="slot">this is header is {{props.contentOne}}</span>
    <span slot="body" slot-scope="props">this is body is {{props.contentTwo}}</span>
   </comp-one>
  `,
  data: {
    text: 123,
    value: 'huanhuan'
  },
  provide () {
    return {
      yeye: this,
      value: this.value // 这不是引用，本组件的value值改变，不会影响到后面实用provide提供的value值的改变
      // Object.defineProperty(value, {
      //   get: () => this.value, //每次调用的时候使用最新的value
      //   enumerable: true
      // }) 这样便实现了每次value改变，后面组件的value值也改变
    }
  }, // 在父级提供了provide之后在子组件就可以使用这些值
  mounted () {
    console.log(this.$refs.comp, this.$refs.slot)
  }
})
