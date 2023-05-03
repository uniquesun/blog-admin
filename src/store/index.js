import Vue from 'vue'
import Vuex from 'vuex'
import ls from "@/utils/localStorage";

Vue.use(Vuex)

const userTokenKey = 'APP_USER_TOKEN'
const userKey = 'APP_USER'
const lastArticle = 'APP_LAST_ARTICLE'
const isCollapse = 'MENU_IS_COLLAPSE'

// 状态对象
const state = {
  user: ls.getItem(userKey),
  token: ls.getItem(userTokenKey),
  lastArticle: ls.getItem(lastArticle),
  isCollapse: ls.getItem(isCollapse) || false
}
// 有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数：
const getters = {}

// 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation 必须是同步函数
const mutations = {
  UPDATE_TOKEN(state, token) {
    state.token = token
    ls.setItem(userTokenKey, token)
  },
  UPDATE_USER(state, user) {
    state.user = user
    ls.setItem(userKey, user)
  },
  UPDATE_MD(state, md) {
    state.lastArticle = md
    ls.setItem(lastArticle, md)
  },
  UPDATE_COLLAPSE(state, bool) {
    state.isCollapse = bool
    ls.setItem(isCollapse, bool)
  }
}

// Action 类似于 mutation，
// 不同在于：Action 提交的是 mutation，而不是直接变更状态。
// Action 可以包含任意异步操作
const actions = {
  updateToken(context, token) {
    context.commit('UPDATE_TOKEN', token)
  },
  updateUser(context, user) {
    context.commit('UPDATE_USER', user)
  },
  updateLastArticle(context, md) {
    context.commit('UPDATE_MD', md)
  },
  updateMenuCollapse(context, bool) {
    context.commit('UPDATE_COLLAPSE', bool)
  }
}

const modules = {}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
})
