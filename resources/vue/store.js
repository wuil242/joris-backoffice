import { createStore } from 'vuex'
import AlertStore from './modules/AlertStore'
import ThemeStore from './modules/ThemeStore'
import UserStore from './modules/UserStore'


// Create a new store instance.
export default createStore({
  devtools: true,
  strict: true,
  modules: {
    alert: AlertStore,
    user: UserStore,
    theme: ThemeStore
  }
})
