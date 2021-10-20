import Router from '../router'

/**
 * representation de l'utilisateur
 * @property {{
 * name:string,
 * token:string,
 * isAdmin:boolean
 * }} user 
 */
const state = {
    user: null
}

const getters = {
  isLoggedIn(state){ return state.user !== null},
  username(state) {return state.user.name}
}

const mutations = {
  USER_LOGIN (state, user) {
    state.user = user
  },

  USER_LOGOUT(state) {
    state.user = null
  },
}

const actions = {
  /**
   * 
   * @param {{commit:Function}} store
   * @param {{email:string, name:string, token:string}} user 
   */
  login({commit}, user) { commit('USER_LOGIN', user); Router.push('/') },

  logout({commit}) { commit('USER_LOGOUT'); Router.push('/login') },
}


export default {
  state,
  getters,
  mutations,
  actions
}