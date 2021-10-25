import FetchApi from "../utils/FetchApi"

function useGetAllProvider() {
  return FetchApi({route: '/service-provider'})
}

export {useGetAllProvider}