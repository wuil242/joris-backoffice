import {createRouter, createWebHashHistory} from 'vue-router'
import { loginGuard } from '../middlewares/Auth'

const Home = () => import('../components/Home.vue')
const HomeStat = () => import('../components/Stat.vue')
const HomeLocation = () => import('../components/locations/Location.vue')
const HomeServiceProvider = () => import('../components/service_providers/ServiceProvider')
const HomeAdmin = () => import('../components/Admin.vue')
const HomeDevis = () => import('../components/Devis.vue')
const HomeEntreprise = () => import('../components/Entreprise.vue')
const HomeTemoignage = () => import('../components/Temoignage.vue')


const route = {
    name: 'home',
    path: '/',
    component: Home,
    // beforeEnter: loginGuard,
    children: [
      {
        name: 'stat',
        path: '/statistique',
        component: HomeStat
      },
      {
        name: 'location',
        path: '/localisation',
        component: HomeLocation
      },
      {
        name: 'service_provider',
        path: '/prestataires',
        component: HomeServiceProvider
      },
      {
        name: 'admin',
        path: '/admin',
        component: HomeAdmin
      },
      {
        name: 'entreprise',
        path: '/entreprise',
        component: HomeEntreprise
      },
      {
        name: 'devis',
        path: '/devis',
        component: HomeDevis
      },
      {
        name: 'temoignage',
        path: '/temoignage',
        component: HomeTemoignage
      }
    ]
  }


export default route
