import {createApp} from 'vue'
import Router from './router'
import {appStore} from './store'
import App from './App.vue'

import '../scss/fonts/all.css'

// const App = require('./App.vue')

const app = createApp(App)

app.use(appStore)

app.use(Router)

app.mount('#app')

const csrfName = 'XSRF-TOKEN='
const cookies = document.cookie.split(';').map(c => c.trim())
const myCookie = cookies.filter(c => c.startsWith(csrfName))

export const csrf = myCookie[0].replace(csrfName, '')
export {appStore}
