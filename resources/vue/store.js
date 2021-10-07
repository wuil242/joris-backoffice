import { createStore } from 'vuex'

// Create a new store instance.
export const appStore = createStore({
  state () {
    return {
      user: null,
      alerts: new Map()
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
        timer: null
      }

      alert.timer = setTimeout(() => {
        state.alerts.delete(alert.timer)
      }, 2500)

      state.alerts.set(alert.timer, alert)
    }
  }
})
