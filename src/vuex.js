/**
* 模拟实现VueX
*/
let Vue
class Store { // state getters mutations actions
  constructor (options) {
    let state = options.state
    this.getters = {}
    this.mutations = {}
    this.actions = {}

    // 什么样的属性可以实现双向绑定 有get set new vue({data: {}})

    // vuex核心就是借用了vue的实例 因为vue实例数据变化会刷新视图
    this._vm = new Vue({
      data: {
        state
      }
    })
    if (options.getters) {
      let getters = options.getters // {newCount : fn}

      forEach(getters, (getterName, getterFn) => {
        Object.defineProperty(this.getters, getterName, {
          get: () => {
            return getterFn(state)
          }
        })
      })
    }
    let mutations = options.mutations
    forEach(mutations, (mutationName, mutationFn) => {
      // this.mutations.change = () => {change(state)}
      this.mutations[mutationName] = () => {
        mutationFn.call(this, state)
      }
    })
    let actions = options.actions
    forEach(actions, (actionName, actionFn) => {
      // this.mutations.change = () => {change(state)}
      this.actions[actionName] = () => {
        actionFn.call(this, this)
      }
    })
    let { commit, dispatch } = this
    this.commit = (type) => {
      commit.call(this, type)
    }
    this.dispatch = (type) => {
      dispatch.call(this, type)
    }
  }
  get state () { // Object.defineProperty
    return this._vm.state
  }
  commit (type) {
    this.mutations[type]()
  }
  dispatch (type) {
    this.actions[type]()
  }
}
function forEach (obj, callback) {
  Object.keys(obj).forEach(item => callback(item, obj[item]))
}
let install = (_Vue) => {
  Vue = _Vue // 保留vue的构造函数
  console.log(_Vue, 'install')
  Vue.mixin({
    beforeCreate () {
      // console.log('beforeCreate')
      // 拿到根组件中的stroe实例给每个组件都加以一个$store
      // 是否是根组件
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store
      } else { // 子组件 深度优先
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}

export default {
  Store,
  install
}
