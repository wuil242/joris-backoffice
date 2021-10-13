import {createRouter, createWebHashHistory} from 'vue-router'
import { loginGuard, logoutGuard } from './middlewares/Auth'

const Home = () => import('./components/Home.vue')
const Login = () => import('./components/Login.vue')


const routes = [
  {
    path: '/',
    component: Home,
    beforeEnter: loginGuard
  },
  {
    path: '/login',
    component: Login,
    beforeEnter: logoutGuard
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
