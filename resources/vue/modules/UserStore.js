import Router from '../router'

/**
 * modèle du state
 * 
 *@type {{
 *  user:{name:string,token:string,isAdmin:boolean}
 *}} 
 */
const state = {
    user: null
}

const getters = {
  isLoggedIn(state){ return state.user !== null && state.user.token !== ''},
  username(state) {return state.user.name},
  token(state){ return state.user.token},
  user(state) {return { ...state.user }}
}

const mutations = {
  USER_LOGIN (state, {name, email, token}) {
    state.user = {name, email, token}
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