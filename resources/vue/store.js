import { createStore } from 'vuex'

// Create a new store instance.
export const userStore = createStore({
  state () {
    return {
      user: null
    }
  },
  mutations: {
    login (state, user) {
      state.user = user
    },

    logout(state) {
      state.user = null
    }
  }
})
