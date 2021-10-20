import {createRouter, createWebHashHistory} from 'vue-router'
import { logoutGuard } from './middlewares/Auth'
import HomepageRoute from './routes/HomepageRoute'

const Login = () => import('./components/Login.vue')

const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login,
    beforeEnter: logoutGuard
  }
]

routes.push(HomepageRoute)

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
