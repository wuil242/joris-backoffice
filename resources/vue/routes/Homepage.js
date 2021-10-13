import {createRouter, createWebHashHistory} from 'vue-router'
import { loginGuard } from '../middlewares/Auth'

const Home = () => import('../components/Home.vue')
const HomeStat = () => import('../components/Stat.vue')
const HomeLocation = () => import('../components/locations/Location.vue')
const HomeServiceProvider = () => import('../components/service_providers/ServiceProvider')
const HomeAdmin = () => import('../components/Admin.vue')
const HomeDevis = () => import('../components/Devis.vue')
const HomeEntreprise = () => import('../components/entreprise/Entreprise.vue')
const HomeEntrepriseList = () => import('../components/entreprise/EntrepriseList.vue')
const HomeEntrepriseMessage = () => import('../components/entreprise/EntrepriseMessage.vue')
const HomeTemoignage = () => import('../components/Temoignage.vue')


const route = {
    name: 'home',
    path: '/',
    component: Home,
    beforeEnter(to, from) {
      if(to.name === 'home') {
        return '/statistique'
      }
      else {
        return true
      }
    },
    // beforeEnter: loginGuard,
    children: [
      {
        name: 'stat',
        path: 'statistique',
        text: 'Statistique',
        icon: 'fa fa-calculator',
        component: HomeStat
      },
      {
        name: 'location',
        path: 'localisation',
        text: 'Localisation',
        icon: 'fa fa-map-marker-alt',
        component: HomeLocation
      },
      {
        name: 'service_provider',
        path: 'prestataires',
        text: 'Prestataire',
        icon: 'fa fa-clipboard',
        component: HomeServiceProvider
      },
      {
        name: 'admin',
        path: 'admin',
        text: 'Administration',
        icon: 'fa fa-users',
        component: HomeAdmin
      },
      {
        name: 'entreprise',
        path: 'entreprise',
        text: 'Entreprise',
        icon: 'fa fa-building',
        component: HomeEntreprise,
        beforeEnter(to, from) {
          if(to.name === 'entreprise') {
            return '/entreprise/list'
          }
          else {
            return true
          }
        },
        children: [
          {
            name: '',
            path: 'list',
            component: HomeEntrepriseList
          },
          {
            name: 'entreprise.messages',
            path: 'messages',
            text: 'Messages',
            icon: 'fa fa-comment-alt',
            component: HomeEntrepriseMessage
          }
        ]
      },
      {
        name: 'devis',
        path: 'devis',
        text: 'Devis',
        icon: 'fa fa-dollar-sign',
        component: HomeDevis
      },
      {
        name: 'temoignage',
        path: 'temoignage',
        text: 'Temoignage',
        icon: 'fa fa-user',
        component: HomeTemoignage
      }
    ]
  }


export default route
