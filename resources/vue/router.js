import {createRouter, createWebHashHistory} from 'vue-router'
import Home from './components/Home.vue'
import Test from './components/Test.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/test',
    component: Test
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})