import FetchApi from "../utils/FetchApi"

function useGetAllProvider() {
  return FetchApi('/service-provider', 'GET')
}

export {useGetAllProvider}