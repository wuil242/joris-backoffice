import {createRouter, createWebHashHistory} from 'vue-router'
import { loginGuard } from '../middlewares/Auth'

const ServiceProvider = () => import('../components/service_providers/ServiceProvider')
const ServiceProviderAdd = () => import('../components/service_providers/ServiceProviderAdd')
const ServiceProviderList = () => import('../components/service_providers/ServiceProviderList')


const route = {
  name: 'service_provider.list',
  path: 'prestataire',
  text: 'Prestataire',
  icon: 'fa fa-clipboard',
  component: ServiceProvider,
  redirect: '/prestataire/list',
  // beforeEnter: loginGuard,
  children: [
    {
      name: 'service_provider.list',
      path: 'list',
      text: 'list',
      icon: 'fa fa-list',
      component: ServiceProviderList
    },
    {
      name: 'service_provider.add',
      path: '/prestataire/ajouter',
      text: 'ajouter',
      icon: 'fa fa-plus',
      component: ServiceProviderAdd
    },
  ]
  }


export default route
