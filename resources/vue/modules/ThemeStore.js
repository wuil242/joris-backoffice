const state = {
    theme: 'dark'
}

const getters = {
  theme_class(state) { return state.theme === 'dark' ? 'theme-dark' : '' }
}

const mutations = {

  THEME_TOGGLE(state) {
    state.theme = state.theme === '' ? 'dark' : ''
  }
}

const actions = {
  toggle({commit}) { commit('THEME_TOGGLE') }
}

export default {
  state,
  getters,
  mutations,
  actions
}