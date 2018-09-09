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
  const store = new Vuex.Store({
    script: true, // 不允许在外部改store的值，只能由mutation改动store的值
    state: defaultState,
    mutations, // 同步的数据可以修改掉的写在mutations里面
    getters,
    actions, // 异步的数据写在actions里面，通过调用mutations
    modules: {
      a: {
        namespaced: true, // 不会与外界的mutations起冲突，命名的规范性
        state: {
          text: 1
        },
        mutations: {
          updateText (state, text) {
            console.log('a.state', state)
            state.text = text
          }
        }, // 如果没有namespaced:true.会将其放在全局的mutations当中
        getters: {
          textPlus (state, getters, rootState) {
            return state.text + 'world' + rootState.count
          } // rootState可以拿到全局的state, rootState.b.text可以拿到b模块的text
        },
        actions: {
          add ({ state, commit, rootState }) {
            commit('updateText', rootState.count)
            commit('updateCount', rootState.count, { root: true }) // 代表调用的是全局的mutations
          } // ctx拿到是当前这个模块的contex, 包括state, commit, rootState
        }
      }, // 模块中还可以嵌套模块
      b: {
        state: {
          text: 2
        }
      }
    }
  })
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutation/mutation',
      './state/getters/getters',
      './action/action'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutation/mutation').default
      const newGettwes = require('./state/getters/getters').default
      const newActions = require('./action/action').default
      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGettwes,
        actions: newActions
      })
    })
  } // 热更替
  return store
}
