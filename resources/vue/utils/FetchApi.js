import { csrf } from "../main"

/**
 * 
 * @param {string} route
 * @param {'GET'|'POST'|'PUT'|'DELETE'} method 
 * @param {any} body 
 * @returns {Promise<any>}
 */
export default function (route, method = 'GET', body = null, headers = {}) {
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
}