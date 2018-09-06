import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutation/mutation'
import getters from './state/getters/getters'
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
    state: defaultState,
    mutations,
    getters
  })
}
