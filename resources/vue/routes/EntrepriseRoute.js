import { loginGuard } from '../middlewares/Auth'

const Entreprise = () => import('../components/entreprise/Entreprise.vue')
const EntrepriseList = () => import('../components/entreprise/EntrepriseList.vue')
const EntrepriseMessage = () => import('../components/entreprise/EntrepriseMessage.vue')


const route = {
    path: '/entreprise',
    text: 'Entreprise',
    icon: 'fa fa-building',
    component: Entreprise,
    children: [
      {
        path: '',
        component: EntrepriseList
      },
      {
        path: '/entreprise/messages',
        text: 'Messages',
        icon: 'fa fa-comment-alt',
        component: EntrepriseMessage
      }
    ]
  }


export default route
