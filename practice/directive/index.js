import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <span>{{text}}</span>
      <span v-if="active">hi</span>
      <span v-else-if="text===0">text is ０</span>
      <span v-else>hello world</span>
      <input type="text" v-model.number="text"/>
      <div v-html="html"></div>
      <ul>
        <li v-for="(itme, index) in arr" :key="itme">{{itme}}</li>
      </ul>
      <ul>
      <li v-for="(itme, key, index) in obj" :key="itme">{{itme}}:{{key}}</li>
      </ul>

      <div>
        <input type="checkbox" :value="1" v-model="arr"/>
        <input type="checkbox" :value="2" v-model="arr"/>
        <input type="checkbox" :value="3" v-model="arr"/>
        <input type="checkbox" :value="4" v-model="arr"/>
      </div>
    </div>
  `,
  data: {
    text: 0,
    active: false,
    arr: [1, 2, 3, 4],
    obj: {
      a: 'hello',
      b: 'ahhh',
      c: 'local'
    },
    html: '<span>hello</span>'
  }
}) // v-cloak防止闪烁，在vue还没加载好的时候，加一个display:none的样式
// v-once数据绑定的内容只执行一次
