import { createStore } from 'vuex'
import FetchApi from './utils/FetchApi'
import Router from './router'

// Create a new store instance.
export const appStore = createStore({
  state () {
    return {
      user: null,
      alerts: []
    }
  },
  mutations: {
    LOGIN (state, user) {
      state.user = user
      Router.push('/')
    },

    LOGOUT(state) {
      FetchApi('/users/logout', 'POST')
      .then(res => {
        if(res.typeCode === 1) {
          state.user = null
          Router.push('/login')
        }
      })
    },

    ALERT(state, {type, message}) {
      state.alerts.push({type, message})
    }
  },
  actions: {
    login({commit}, payload) { commit('LOGIN', payload) },
    logout({commit}) { commit('LOGOUT') },
    alert({commit}, payload) { commit('ALERT', payload) }
  }
})
