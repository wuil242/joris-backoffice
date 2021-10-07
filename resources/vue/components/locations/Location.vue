<template>
  <div class="loaction">
    <h1>Villes|Arrondissements|Quartiers</h1>
  </div>
  <nav>
    <ul>
      <li><button @click="goto('city')">Page Ville</button></li>
      <li><button @click="goto('arrondissement')">Page Arronissents</button></li>
      <li><button @click="goto('quater')">Page Quartier</button></li>
    </ul>
  </nav>
  <keep-alive>
    <city v-if="data.route === 'city'"></city>
  </keep-alive>
  <keep-alive>
    <arrondissement v-if="data.route === 'arrondissement'"></arrondissement>
  </keep-alive>
</template>


<script setup>

import {reactive} from 'vue'
import City from './City.vue'
import Arrondissement from './Arrondissement.vue'

const data = reactive({
  route: 'city'
})

/**
 * @param {string} route
 */
function goto(route) {
  data.route = route
}
  
</script>

<style lang="scss">
  .location {

  }
</style>
