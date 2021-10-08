<template>
<div class="app" >
  <!-- <login v-if="!store.state.user"></login> -->
  <!-- <home v-else></home> -->
  <alerts 
    :alerts="store.state.alerts" 
    @close-one="close"
    @close-all="close"
  ></alerts>
  <home></home>
</div>
</template>

<script setup>
import { useStore } from 'vuex';
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Alerts from './components/Alerts.vue'

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
    store.state.alerts = []
  }
  else if(typeof key === 'number') {
    store.state.alerts = store.state.alerts.filter((v, k) => k !== key)
  }
}

</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  // .app {
  //   padding: 1rem;
  // }
</style>


