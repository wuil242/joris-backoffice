import { createStore } from 'vuex'

// Create a new store instance.
export const appStore = createStore({
  state () {
    return {
      user: null,
      alerts: []
    }
  },
  mutations: {
    login (state, user) {
      state.user = user
    },

    logout(state) {
      state.user = null
    },

    alert(state, newAlert) {
      const alert = {
        type: newAlert.type,
        message: newAlert.message,
      }

      state.alerts.push(alert)
    }
  }
})
