const state = {
    id: 0,
    alerts: [],
    timers: new Map()
}

const getters = {
  alerts(state) {return state.alerts}
}

const mutations = {
  ALERT_ADD(state, {type, message, hit = null}) {
    const id = ++state.id
    state.alerts.push({type, id, message: message + `[${id}]`, hit})
  },

  ALERT_CLEAN_ALL(state) {
    state.alerts = []

    for (const key of state.timers.entries()) {
      clearInterval(key[1])
      state.timers.delete(key[0])
    }
  },

  ALERT_CLEAN(state, id) {
    state.alerts = state.alerts.filter(alert => alert.id !== id)
    if(state.timers.has(id)) {
      clearInterval(state.timers.get(id))
      state.timers.delete(id)
    }
  },

  ALERT_HIT(state, id) {
    state.alerts.forEach(alert => {
      if(alert.id === id) {
        alert.hit -= 1
      }
    })
  },

  ALERT_DELETE_LAST(state) {
    state.alerts.pop()
  },

  TIMER_INIT(state, timer) {
    state.timers.set(state.id, timer)
  },

  TIMER_DELETE(state, id) {
    if(state.timers.has(id)) {
      clearTimeout(state.timers.get(id))
      state.timers.delete(id)
    }
  }
}

const actions = {

  /**
   * 
   * @param {{type:string, message:string}} alert 
   */
  alert({commit}, alert) { commit('ALERT_ADD', alert) },

  alert_clean_all({commit}) { commit('ALERT_CLEAN_ALL') },

  /**
   * 
   * @param {number} key 
   */
   alert_clean({commit}, key) { commit('ALERT_CLEAN', key)},

   alert_then_clean({commit, state}, {time = 5, type, message}) {

     commit('ALERT_ADD', {type, message, hit: Math.round(time)})
     
     const id = state.alerts[state.alerts.length - 1].id
     
     const index = setInterval(() => {
       const alert = state.alerts.find(alert => alert.id === id)

       commit('ALERT_HIT', id)
       if(alert.hit <= 0) {
         commit('ALERT_CLEAN', id)
         commit('TIMER_DELETE', id)
       }
     }, 1000)
     
     commit('TIMER_INIT', index)
   }
}

export default {
  state,
  getters,
  mutations,
  actions,
}