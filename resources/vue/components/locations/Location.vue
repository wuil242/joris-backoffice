<template>
  <div class="loaction">
    <h1>Villes|Arrondissements|Quartiers</h1>
    <section class="location-section">
      <cities :cities="data.cities" @add="add_city" @select="get_arrondissemets"></cities>
      <arrondissements></arrondissements>
      <quaters></quaters>
    </section>
  </div>
  <!-- <nav>
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
  </keep-alive> -->
</template>


<script setup>

import {reactive, onMounted} from 'vue'
import FetchApi from '../../utils/FetchApi';
import Cities from './Cities.vue'
import Arrondissements from './Arrondissements.vue'
import Quaters from './Quaters.vue'

const data = reactive({
  route: 'city',
  cities: []
})

onMounted(() => {
  get_cities()
})

function get_arrondissemets(id) {
  console.log(id)
}

function get_cities() {
  FetchApi('/api/cities')
    .then(res => {
      data.cities = res
      get_arrondissemets(res[0].id)
    })
}

function add_city() {
  FetchApi('/api/cities', 'POST', {name: data.name})
    .then(res => {
      data.res = res
      get_cities()
      get_arrondissemets(res.id)
    })
}


/**
 * @param {string} route
 */
function goto(route) {
  data.route = route
}
  
</script>

<style lang="scss">
  .location {

    &-section {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>
