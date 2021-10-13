import {appStore} from '../main'


/**
 * 
 * @param {import('vue-router').RouteLocationNormalized} to 
 * @param {import('vue-router').RouteLocationMatched} from 
 * @param {import('vue-router').NavigationGuardNext} next 
 */
export const loginGuard = (to, from, next) => {
  const user = appStore.state.user
  if(user?.email && user?.token && user?.email !== '' && user?.token !== '') {
    next()
  }
  else {
    next('/login')
  }
}

/**
 * 
 * @param {import('vue-router').RouteLocationNormalized} to 
 * @param {import('vue-router').RouteLocationMatched} from 
 * @param {import('vue-router').NavigationGuardNext} next 
 */
export const logoutGuard = (to, from, next) => {
  const user = appStore.state.user
  if(user?.email && user?.token && user?.email !== '' && user?.token !== '') {
    next('/')
  }
  else {
    next()
  }
}
