/**
 * modèle du state
 * 
 * @type {{loading:number}}
 */
 const state = {
  loading: false
}

const getters = {
  isLoading(state) { return state.loading }
}

const mutations = {

  LOADER_LOADING_START(state) {
    state.loading = true
  },

  LOADER_LOADING_Stop(state) {
    state.loading = false
  }
}

const actions = {
  loading_start({commit}) { commit('LOADER_LOADING_START') },
  loading_stop({commit}) { commit('LOADER_LOADING_Stop') }
}

export default {
state,
getters,
mutations,
actions
}