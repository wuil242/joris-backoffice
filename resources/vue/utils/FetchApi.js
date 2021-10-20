import { CSRF } from "../main"
import Store from '../store'

/**
 * 
 * @param {string} route
 * @param {'GET'|'POST'|'PUT'|'DELETE'} method 
 * @param {any} body 
 * @param {boolean} alert
 * @param {{}} headers
 * 
 * @returns {Promise<any>}
 */
export default function (route, method = 'GET', body = null, query = null, alert = true, headers = {}) {
  headers['X-XSRF-TOKEN'] = CSRF
  
  if(body) {
    body = JSON.stringify(body)
    headers['Content-Type'] = 'application/json'
  }

  if(query) {
    const qs = new  URLSearchParams()
    for (const key in query) {
      qs.append(key, query[key])
    }

    query = '?' + qs.toString()
  }

  if(Store.getters.isLoggedIn) {
    headers['Authorization'] = 'Bearer ' + Store.getters.token
  }

  return fetch('/api' + route + (query || ''), {
    method,
    body,
    headers
  }).then(r => r.json())
    .then(data => {
      if(data.type && alert) {
        Store.dispatch('alert_then_clean', {
          type: data.type,
          message: data.message
        })
      }

      return Promise.resolve(data)
    })
}