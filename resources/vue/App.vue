<template>
<div class="app" >
  <!-- <login v-if="!store.state.user"></login> -->
  <!-- <home v-else></home> -->
  <alerts 
    :alerts="store.state.alerts" 
    @close-one="close"
    @close-all="close"
  ></alerts>
  <router-view></router-view>
</div>
</template>

<script setup>
import { useStore } from 'vuex';
import Alerts from './components/notification/Alerts.vue'

const store = useStore()

/**
 * @param {number[]} tab
 */
function deleteMAny(tab) {
  setTimeout(() => {
    if(tab.length > 0 && store.state.alerts.size > 0) {
      store.state.alerts.delete(tab.pop())
      deleteMAny(tab)
    }
  }, 500)
}

/**
 * @param {number|undefined} key
 */
function close(key) {
  if(typeof key === 'undefined' ) {
    store.dispatch('alert_clean_all')
  }
  else if(typeof key === 'number') {
    store.dispatch('alert_clean', key)
  }
}

</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  .app {
    background: linear-gradient(-30deg, red 25%, yellow, green 50%)
  }

  // .app {
  //   padding: 1rem;
  // }
</style>


