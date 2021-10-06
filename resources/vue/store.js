import { createStore } from 'vuex'

// Create a new store instance.
export const appStore = createStore({
  state () {
    return {
      user: null,
      alert: {
        type: '',
        message: '',
      },
      alertTimer: null
    }
  },
  mutations: {
    login (state, user) {
      state.user = user
    },

    logout(state) {
      state.user = null
    },

    alert(state, alert) {
      state.alert = alert

      if(state.alertTimer !== null){
        clearTimeout(state.alertTimer)
        state.alertTimer = null
      }
      
      state.alertTimer = setTimeout(() => {
        state.alert.message = ''
      }, 2500)
    }
  }
})
