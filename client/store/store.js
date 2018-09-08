import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutation/mutation'
import getters from './state/getters/getters'
import actions from './action/action'
// import Vue from 'vue'

// Vue.use(Vuex)
// const store = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     updateCount (state, num) {
//       state.count = num
//     }
//   }
// })
export default () => {
  return new Vuex.Store({
    script: true, // 不允许在外部改store的值，只能由mutation改动store的值
    state: defaultState,
    mutations, // 同步的数据可以修改掉的写在mutations里面
    getters,
    actions // 异步的数据写在actions里面，通过调用mutations
  })
}
