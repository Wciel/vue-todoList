import Vue from 'vue'

const component = {
  template: `
    <div :style="style"></div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      }
    }
  }
}

new Vue({
  components: {
    ComOne: component
  },
  el: '#root'
})
