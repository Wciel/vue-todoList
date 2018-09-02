import Vue from 'vue'

new Vue({
  el: '#root',
  // template: `
  //   <div :class="{active : !isActive}">
  //     {{isActive ? 'active' : 'notActive'}}
  //     <p v-html="html" :id="aaa" @click="handleClick"></p>
  //   </div>
  // `,
  template: `
    <div :class="[{ active: isActive }]">
      {{isActive ? 'active' : 'notActive'}}
      <p
        v-html="html"
        :id="aaa"
        @click="handleClick"
        :style="[styles, styles2]"
      >
      </p>
      <p>{{getJoinedArr(arr)}}</p>
    </div>
  `,
  data: {
    isActive: false,
    html: '<span>123</span>',
    aaa: 'hello',
    arr: [1, 2, 3, 4],
    styles: {
      color: 'red'
    },
    styles2: {
      border: '1px solid red'
    }
  },
  methods: {
    handleClick () {
      console.log('clicked')
    },
    getJoinedArr (arr) {
      return arr.join(' ')
    }
  }
})
// {{}}里面写一行语句能够得到一个返回结果的
