import {createApp} from 'vue'
import Router from './router'
import App from './App.vue'
import {userStore} from './store'

// const App = require('./App.vue')

const app = createApp(App)

// app.config.devtools = true
app.use(Router)

app.use(userStore)

app.mount('#app')

export const csrf = document.cookie.replace('XSRF-TOKEN=', '')
