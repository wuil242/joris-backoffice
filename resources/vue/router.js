import {createRouter, createWebHashHistory} from 'vue-router'
import { logoutGuard } from './middlewares/Auth'
import HomepageRoute from './routes/HomepageRoute'
import ServiceProviderRoute from './routes/ServiceProviderRoute'

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
// routes.push(ServiceProviderRoute)

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
