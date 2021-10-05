import {createApp} from 'vue'
import Router from './router'
import App from './App.vue'
import {countStore} from './store'

// const App = require('./App.vue')

const app = createApp(App)

// app.config.devtools = true

app.use(Router)

app.use(countStore)

app.mount('#app')