import { loginGuard } from '../middlewares/Auth'
import ServiceProviderRoute from './ServiceProviderRoute'
import EntrepriseRoute from './EntrepriseRoute'

const Home = () => import('../components/home/Home.vue')
const HomeStat = () => import('../components/Stat.vue')
const HomeLocation = () => import('../components/location/Location.vue')
const HomeAdmin = () => import('../components/Admin.vue')
const HomeDevis = () => import('../components/Devis.vue')
const HomeTemoignage = () => import('../components/Temoignage.vue')
const HomeProfil = () => import('../components/Profil.vue')
const HomeJob = () => import('../components/jobs/Job.vue')


const route = {
    name: 'home',
    path: '/',
    component: Home,
    redirect: '/statistique',
    children: [
      {
        path: '/profil',
        component: HomeProfil
      },
      {
        path: '/statistique',
        icon: 'fa fa-clipboard-list',
        text: 'Statistique',
        component: HomeStat
      },
      {
        path: '/metier',
        icon: 'fa fa-suitcase',
        text: 'Metiers',
        component: HomeJob
      },
      {
        name: 'location',
        path: '/localisation',
        text: 'Localisation',
        icon: 'fa fa-map-marker-alt',
        component: HomeLocation
      },
      {
        name: 'admin',
        path: '/administrateurs',
        text: 'Administration',
        icon: 'fa fa-users',
        component: HomeAdmin
      },
      {
        name: 'devis',
        path: '/devis',
        text: 'Devis',
        icon: 'fa fa-dollar-sign',
        component: HomeDevis
      }
    ]
}

route.children.push(ServiceProviderRoute)
route.children.push(EntrepriseRoute)


export default route
