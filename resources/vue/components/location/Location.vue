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
      
      <quaters
        :city-id="data.currentCity" 
        :arrondissement-id="data.currentArrondissement"
      ></quaters>
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

import {reactive} from 'vue'
import Cities from './Cities.vue'
import Arrondissements from './Arrondissements.vue'
import Quaters from './Quaters.vue'

const data = reactive({
  currentCity: 0,
  currentArrondissement: 0
})

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
