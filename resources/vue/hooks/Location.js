import FetchApi from "../utils/FetchApi" 


/**
 * 
 * @param {string} route 
 * @param  {number[]} ids 
 * @returns {Promise<any}
 */
function getAll(route, ...ids) {
  for (const index in ids) {
    if(ids[index] <= 0) return
    route = route.replace(`$${index}`, ids[index])
  }
  return FetchApi({route})
}

/**
 * 
 * @returns {Promise<{name:string|id:id}[]>}
 */
export function useGetCities() {
  return getAll('/cities')
}

/**
* 
* @param {number} cityId identifiant unique de la ville ou se situe l'arrondissement 
* @returns {Promise<{arrondissements:{name:string, id:number}[], meta: []}>}
*/
export function useGetArrondissements(cityId) {
 return getAll('/cities/$0/arrondissements', cityId)
}

/**
 * 
 * @param {number} cityId 
 * @param {number} arrondissementId 
 * @returns {Promise<{}>}
 */
export function  useGetQuaters(cityId, arrondissementId) {
  return getAll('/cities/$0/arrondissements/$1/quaters', cityId, arrondissementId)
}