<template>
  <div class="loaction">
    <h1>Villes|Arrondissements|Quartiers</h1>
    <section class="location-section">
      <cities 
        :cities="data.cities" 
        @add="add_city" 
        @select="get_arrondissemets"
        @delete="remove_city"
      ></cities>

      <arrondissements 
        :arrondissements="data.arrondissements"
        @add="add_arrondissement" 
        @select="get_quaters"
        @delete="remove_arrondissement"
      ></arrondissements>
      
      <quaters
        :quaters="data.quaters"
      >
      </quaters>
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
  },
  quaters: {
    current: 0,
    elements: []
  }
})

const store = useStore()

onMounted(() => {
  get_cities()
})

/**
 * @param {number} arrondissementId
 */
function get_quaters(arrondissementId) {
  console.log(data.cities.current, arrondissementId)
   FetchApi(`/api/cities/${data.cities.current}/arrondissements/${arrondissementId}/quaters`)
    .then(res => {
      console.log(res)
      data.quaters.elements = res
      data.arrondissements.current = arrondissementId
       if(res.length > 0) {
         data.quaters.current = res[0].id
       }
    })
}


/**
 * @param {number} arrondissementId
 */
function remove_arrondissement(arrondissementId) {
  console.log('Remove Arr', arrondissementId)
}

/**
 * @param {string} name
 */
function add_arrondissement(name) {
  FetchApi(`/api/cities/${data.cities.current}/arrondissements`, 'POST', {name})
    .then(res => {
      data.arrondissements.elements = res
      data.arrondissements.current = res.id
      get_arrondissemets(data.cities.current)
      get_quaters(res.id)
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
         get_quaters(data.arrondissements.current)
       }
    })
}

/**
 * @param {number} cityId
 */
function remove_city(cityId) {
  FetchApi('/api/cities', 'DELETE', {cityId})
    .then(res => {
      store.commit('alert', res)
      if(res.type === 'success') {
        data.cities.elements = data.cities.elements.filter(city => city.id !== cityId)
        get_arrondissemets(data.cities.elements[0].id)
      }
    })
}

function get_cities() {
  FetchApi('/api/cities')
    .then(res => {
      data.cities.elements = res    
      if(res.length > 0) {
        data.cities.current = res[0].id 
        get_arrondissemets(res[0].id)
      }
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
      gap: 5px;
    }
  }
</style>
