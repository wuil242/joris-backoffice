import { loginGuard } from '../middlewares/Auth'

const Home = () => import('../components/home/Home.vue')
const HomeStat = () => import('../components/Stat.vue')
const HomeLocation = () => import('../components/location/Location.vue')
const HomeAdmin = () => import('../components/Admin.vue')
const HomeDevis = () => import('../components/Devis.vue')
const HomeTemoignage = () => import('../components/Temoignage.vue')
const HomeProfil = () => import('../components/Profil.vue')
const HomeJob = () => import('../components/jobs/Job.vue')
const HomeServiceProvider = () => import('../components/service_providers/ServiceProvider.vue')
const HomeEntreprise = () => import('../components/entreprise/Entreprise.vue')


const route = {
    name: 'home',
    path: '/',
    component: Home,
    redirect: '/statistique',
    // beforeEnter: loginGuard,
    children: [
      {
        path: 'profil',
        component: HomeProfil
      },
      {
        name: 'statistique',
        path: 'statistique',
        icon: 'fa fa-clipboard-list',
        text: 'Statistique',
        component: HomeStat
      },
      {
        name: 'service_provider',
        path: 'prestataires',
        icon: 'user',
        text: 'Prestataires',
        component: HomeServiceProvider
      },
      {
        name: 'devis',
        path: 'devis',
        text: 'Devis Des Clients',
        icon: 'fa fa-dollar-sign',
        component: HomeDevis
      },
      {
        name: 'entreprise',
        path: 'entreprises',
        icon: 'building',
        text: 'Entreprise',
        component: HomeEntreprise
      },
      {
        name: 'job',
        path: 'metiers',
        icon: 'fa fa-suitcase',
        text: 'Metiers',
        component: HomeJob
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
        path: 'adminsistrateurs',
        text: 'Adminsistrateurs',
        icon: 'fa fa-users',
        component: HomeAdmin
      }
    ]
}

export default route
