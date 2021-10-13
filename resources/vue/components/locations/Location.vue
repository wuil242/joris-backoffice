<template>
  <div class="loaction">
    <h1>Villes|Arrondissements|Quartiers</h1>
      <section class="location-section">
      <cities @select="data.currentCity = $event" :current="data.currentCity"></cities>

      <arrondissements
        :current="data.currentArrondissement"
        :cityId="data.currentCity"
        @select="data.currentArrondissement = $event"
      ></arrondissements>
      
      <!-- <quaters
        :quaters="data.quaters"
        @add="add_quater"
        @select="data.quaters.current = $event"
      >
      </quaters> -->
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
  currentCity: 0,
  currentArrondissement: 0,
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

/**
 * @param {string} name
 */
function add_quater(name) {
  FetchApi(
    `/cities/${data.cities.current}/arrondissements/${data.arrondissements.current}/quaters`, 
    'POST',
    {name},
    false
  ).then(res => {
    if(res.quaters) {
      data.quaters.elements = res.quaters
      data.quaters.current = res.quaters[0].id
      get_quaters(data.arrondissements.current, data.quaters.current)
    }
  })
}

/**
 * @param {number} arrondissementId
 * @param {null|number} id
 */
function get_quaters(arrondissementId, id = null) {
    console.log(arrondissementId)
   FetchApi(`/cities/${data.currentCity}/arrondissements/${arrondissementId}/quaters`)
    .then(res => {
      data.quaters.elements = res
      data.currentArrondissement = arrondissementId
       if(res.length > 0) {
         data.quaters.current = id || res[0].id
       }
    })
}



/**
 * @param {number} cityId
 * @param {null|number} id
 */
function get_arrondissements(cityId, id = null) {
  
  console.log(data.currentCity)
  // FetchApi(`/cities/${cityId}/arrondissements`)
  //   .then(res => {
  //     data.arrondissements.elements = res
  //     data.currentCity = cityId
  //      if(res.length > 0) {
  //        data.arrondissements.current = res[0].id
  //        get_quaters(id || data.arrondissements.current)
  //      }
  //   })
}
  
</script>

<style lang="scss" scoped>
  .location {

    &-section {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 5px;
    }
  }
</style>
