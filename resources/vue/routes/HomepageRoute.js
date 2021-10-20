import { loginGuard } from '../middlewares/Auth'
import ServiceProviderRoute from './ServiceProviderRoute'
import EntrepriseRoute from './EntrepriseRoute'

const Home = () => import('../components/Home.vue')
const HomeStat = () => import('../components/Stat.vue')
const HomeLocation = () => import('../components/locations/Location.vue')
const HomeAdmin = () => import('../components/Admin.vue')
const HomeDevis = () => import('../components/Devis.vue')
const HomeTemoignage = () => import('../components/Temoignage.vue')


const route = {
    name: 'home',
    path: '/',
    component: Home,
    children: [
      {
        path: '/statistique',
        icon: 'fa fa-clipboard-list',
        text: 'Statistique',
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
        name: 'admin',
        path: 'admin',
        text: 'Administration',
        icon: 'fa fa-users',
        component: HomeAdmin
      },
      {
        name: 'devis',
        path: 'devis',
        text: 'Devis',
        icon: 'fa fa-dollar-sign',
        component: HomeDevis
      },
      // ServiceProviderRoute,
      // EntrepriseRoute
    ]
    // beforeEnter: loginGuard,
  /*
    children: [
      {
        name: 'temoignage',
        path: 'temoignage',
        text: 'Temoignage',
        icon: 'fa fa-user',
        component: HomeTemoignage
      }
    ]
  */
}

route.children.push(ServiceProviderRoute)
route.children.push(EntrepriseRoute)


export default route
