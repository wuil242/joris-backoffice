import {createRouter, createWebHashHistory} from 'vue-router'
import { loginGuard, logoutGuard } from './middlewares/Auth'

const Home = () => import('./components/Home.vue')
const HomeLocation = () => import('./components/locations/Location.vue')
const HomeServiceProvider = () => import('./components/service_providers/ServiceProvider')

const Login = () => import('./components/Login.vue')


const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    // beforeEnter: loginGuard,
    children: [
      {
        name: 'location',
        path: '/localisation',
        component: HomeLocation
      },
      {
        name: 'service_provider',
        path: '/prestataires',
        component: HomeServiceProvider
      }
    ]
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
