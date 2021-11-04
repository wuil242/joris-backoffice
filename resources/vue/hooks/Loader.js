import store from "../store";

export function useStartLoading() {
  store.dispatch('loading_start')
}

export function useStopLoading() {
  store.dispatch('loading_stop')
}
