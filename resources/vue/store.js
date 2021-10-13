import { createStore } from 'vuex'
import FetchApi from './utils/FetchApi'
import Router from './router'

const state = () => {
  return {
    user: null,
    alerts: []
  }
}

//TODO: mettre en place les getters exact
const getters = {
}

const mutations = {
  LOGIN (state, user) {
    state.user = user
  },

  LOGOUT(state) {
    state.user = null
  },

  ALERT_ADD(state, {type, message}) {
    state.alerts.push({type, message})
  },

  ALERT_CLEAN_ALL(state) {
    state.alerts = []
  },

  ALERT_CLEAN(state, key) {
    state.alerts = state.alerts.filter((v, k) => k !== key)
  }
}

const actions = {
  /**
   * 
   * @param {{commit:Function}} store
   * @param {{email:string, name:string, token:string}} user 
   */
  login({commit}, user) { commit('LOGIN', user); Router.push('/') },

  logout({commit}) { commit('LOGOUT'); Router.push('/login') },

  /**
   * 
   * @param {{type:string, message:string}} alert 
   */
  alert({commit}, alert) { commit('ALERT_ADD', alert) },

  alert_clean_all({commit}) { commit('ALERT_CLEAN_ALL') },

  /**
   * 
   * @param {number} key 
   */
   alert_clean({commit}, key) { commit('ALERT_CLEAN', key)}
}

// Create a new store instance.
export const appStore = createStore({
  state,
  getters,
  mutations,
  actions,
  devtools: true,
  strict: true,
})
