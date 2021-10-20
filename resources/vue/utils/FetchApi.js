import { csrf, appStore } from "../main"

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
  headers['X-XSRF-TOKEN'] = csrf
  
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

  if(appStore.state.user) {
    headers['Authorization'] = 'Bearer ' + appStore.state.user.token
  }

  return fetch('/api' + route + (query || ''), {
    method,
    body,
    headers
  }).then(r => r.json())
    .then(data => {
      if(data.type && alert) {
        appStore.dispatch('alert_then_clean', {
          type: data.type,
          message: data.message
        })
      }

      return Promise.resolve(data)
    })
}