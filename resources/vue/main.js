import {createApp} from 'vue'
import Router from './router'
import Store from './store'
import App from './App.vue'

//import du css de fontawesome
import '../scss/fonts/all.css'

const app = createApp(App)

app.use(Store)
   .use(Router)
   .mount('#app')

const csrfName = 'XSRF-TOKEN='
const cookies = document.cookie.split(';').map(c => c.trim())
const myCookie = cookies.filter(c => c.startsWith(csrfName))

export const CSRF = myCookie[0].replace(csrfName, '')
