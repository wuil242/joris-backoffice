import {createApp} from 'vue'
import Router from './router'
import App from './App.vue'
import {appStore} from './store'

// const App = require('./App.vue')

const app = createApp(App)

// app.config.devtools = true
app.use(Router)

app.use(appStore)

app.mount('#app')

export const csrf = document.cookie.replace('XSRF-TOKEN=', '')
