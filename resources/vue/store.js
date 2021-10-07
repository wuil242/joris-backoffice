import { createStore } from 'vuex'

// Create a new store instance.
export const appStore = createStore({
  state () {
    return {
      user: null,
      alert: {
        type: '',
        message: '',
        timer: null
      }
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
      state.alert.type = alert.type
      state.alert.message = alert.message

      if(state.alert.timer !== null){
        clearTimeout(state.alert.timer)
        state.alert.timer = null
      }
      
      state.alert.timer = setTimeout(() => {
        state.alert.message = ''
      }, 2500)
    }
  }
})
