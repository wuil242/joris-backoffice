import {createRouter, createWebHashHistory} from 'vue-router'
import Stat from './components/Stat.vue'
import Login from './components/Login.vue'
import ListAdmin from './components/ListAdmin.vue'
import Profil from './components/Profil.vue'
import ServiceProvider from './components/service_providers/ServiceProvider.vue'
import Location from './components/locations/Location.vue'

const routes = [
  {
    path: '/',
    component: Stat
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/admin',
    component: ListAdmin
  },
  {
    path: '/profil',
    component: Profil
  },
  {
    path: '/prestataire',
    component: ServiceProvider
  },
  {
    path: '/location',
    component: Location
  },
  
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})