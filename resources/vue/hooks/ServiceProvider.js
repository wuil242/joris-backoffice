import FetchApi from "../utils/FetchApi"

export function useGetAllProvider() {
  return FetchApi({route: '/service-provider'})
}

/**
 * 
 * @param {{
 * firstname:string,
 * lastname:string,
 * sexe:'m'|'f',
 * email:string
 * }} data 
 */
export function useCreateProvider(data) {
  return FetchApi({route: '/service-provider', method: 'POST', body: data})
}
