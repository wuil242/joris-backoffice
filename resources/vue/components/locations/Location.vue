<template>
  <div class="loaction">
    <h1>Villes|Arrondissements|Quartiers</h1>
    <section class="location-section">
      <cities :cities="data.cities" @add="add_city" @select="get_arrondissemets"></cities>
      <arrondissements :arrondissements="data.arrondissements"></arrondissements>
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
import { useStore } from 'vuex';

const data = reactive({
  route: 'city',
  cities: {
    current: 0,
    elements: []
  },
  arrondissements: {
    current: 0,
    elements: []
  }
})

const store = useStore()

onMounted(() => {
  get_cities()
})

/**
 * @param {number} cityId
 */
function add_arrondissement(cityId) {
  FetchApi(`/api/cities/${cityId}/arrondissements`, 'POST')
    .then(res => {
      data.arrondissements.elements = res
      data.cities.current = cityId
      data.arrondissements.current = res[0].id
    })
}

/**
 * @param {number} cityId
 */
function get_arrondissemets(cityId) {
  FetchApi(`/api/cities/${cityId}/arrondissements`)
    .then(res => {
      data.arrondissements.elements = res
      data.cities.current = cityId
       if(res.length > 0) {
         data.arrondissements.current = res[0].id
       }
    })
}

function get_cities() {
  FetchApi('/api/cities')
    .then(res => {
      data.cities.elements = res     
      get_arrondissemets(res[0].id)
    })
}

function add_city(name) {
  FetchApi('/api/cities', 'POST', {name})
    .then(res => {
      if(res.type) {
        store.commit('alert', res)
        return
      }

      data.cities.elements.push(res)
      get_cities()
      store.commit('alert', {type:'success', message: `la ville "${res.name}" a bien ete ajouter`})
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
