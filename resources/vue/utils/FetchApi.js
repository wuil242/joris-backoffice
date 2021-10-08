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
export default function (route, method = 'GET', body = null, alert = false, headers = {}) {
  headers['X-XSRF-TOKEN'] = csrf
  
  if(body) {
    body = JSON.stringify(body)
    headers['Content-Type'] = 'application/json'
  }

  return fetch(route, {
    method,
    body,
    headers
  }).then(r => r.json())
    .then(data => {
      if(data.type) {
        appStore.commit('alert', {
          type: data.type,
          message: data.message
        })
      }

      return Promise.resolve(data)
    })
}