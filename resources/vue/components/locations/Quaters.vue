<template>
  <div class="quaters">
    <location-layout 
      label="Nom de l'arrondissement" 
      submitMessage="ajouter une ville"
      :locations="data.quaters"
      :current="data.currentQuater"
      border-color="gold"
      @add="add_quater"
      @select="data.currentQuater = $event"
      @delete="remove_quater"
    >
      <h2 slot="title">Ajouter Un arrondissement</h2>
      <!-- <h2 slot="location-title">Toutes les Villes</h2> -->
      <!-- <p slot="empty-message">Aucune Ville</p> -->
    </location-layout>
  </div>
</template>


<script setup>
import LocationLayout from './LocationLayout.vue';
import {reactive, onUpdated} from 'vue'
import FetchApi from '../../utils/FetchApi';


const $props = defineProps({
  cityId: {type:Number, required: true},
  arrondissementId: {type:Number, required: true}
})


const $emit = defineEmits(['add', 'select', 'delete'])

const data = reactive({
  quaters: {
    elements: [],
  },
  errors: [],
  lastCity: 0,
  lastArrondissement: 0,
  currentQuater: 0,
})

onUpdated(() => {
  if(data.lastArrondissement !== $props.arrondissementId) {
    console.log($props.arrondissementId, $props.cityId)
    data.lastArrondissement = $props.arrondissementId
    data.lastCity = $props.cityId
    get_quaters(data.lastArrondissement)
  }
})

/**
 * @param {string} id
 */
function remove_quater(id) {
  console.log('REMOVE QUATER [%d]', id)
}


/**
 * @param {string} name
 */
function add_quater(name) {
  FetchApi(
    `/cities/${data.lastCity}/arrondissements/${data.lastArrondissement}/quaters`, 
    'POST',
    {name},
    false
  ).then(res => {
    if(res.quaters) {
      data.quaters.elements = res.quaters
      data.currentQuater = res.quaters[0].id
      // get_quaters(data.lastArrondissement, data.currentQuater)
    }
  })
}

/**
 * @param {number} arrondissementId
 * @param {null|number} id
 */
function get_quaters(arrondissementId, id = null) {
   FetchApi(`/cities/${data.lastCity}/arrondissements/${arrondissementId}/quaters`)
    .then(res => {
      data.quaters.elements = res
       if(res.length > 0) {
         data.currentQuater = id || res[0].id
       }
    })
}


</script>

<style lang="scss" scoped>
</style>
