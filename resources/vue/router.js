import {createRouter, createWebHashHistory} from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/Login.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: Login
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})