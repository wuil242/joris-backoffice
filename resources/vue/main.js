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

const csrfName = 'XSRF-TOKEN='
const cookies = document.cookie.split(';').map(c => c.trim())
const myCookie = cookies.filter(c => c.startsWith(csrfName))

export const csrf = myCookie[0].replace(csrfName, '')
export {appStore}
