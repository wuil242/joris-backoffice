<template>
  <div class="arrondissements">
    <location-layout 
      label="Nom de l'arrondissement" 
      submitMessage="ajouter une ville"
      :locations="data.arrondissements"
      :current="current"
      border-color="teal"
      @add="add_arrondissement"
      @select="$emit('select', $event)"
      @delete="remove_arrondissement"
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
  current: {type:Number, required: true}, 
  cityId: {type:Number, required: true}
})


const $emit = defineEmits(['add', 'select', 'delete'])

const data = reactive({
  arrondissements: {
    elements: [],
  },
  errors: [],
  lastCity: 0
})

onUpdated(() => {
  if(data.lastCity !== $props.cityId) {
    data.lastCity = $props.cityId
    get_arrondissements(data.lastCity)
  }
})


/**
 * @param {number} arrondissementId
 */
function remove_arrondissement(arrondissementId) {
  FetchApi(`/cities/${data.lastCity}/arrondissements`, 'DELETE', {arrondissementId})
    .then(res => {

     if(res.type === 'success') {
        data.arrondissements.elements = data.arrondissements.elements.filter(arr => arr.id !== arrondissementId)
        if(data.arrondissements.elements.length > 0) {
          // get_quaters(data.arrondissements.elements[0].id)
          $emit('select', data.arrondissements.elements[0].id)
        }
      }
    })
}

/**
 * @param {string} name
 */
function add_arrondissement(name) {
  FetchApi(`/cities/${data.lastCity}/arrondissements`, 'POST', {name})
    .then(res => {
      // data.arrondissements.elements = res
      // $props.current = res.id
      // get_quaters(res.id)
      get_arrondissements(data.lastCity, res.id)
      // $emit('select', res.id)
    })
}

/**
 * @param {number} cityId
 * @param {null|number} id
 */
function get_arrondissements(cityId, id = null) {
  FetchApi(`/cities/${cityId}/arrondissements`)
    .then(res => {
      data.arrondissements.elements = res
      // $props.cityId = cityId
       if(res.length > 0) {
        //  $props.current = res[0].id
        //  get_quaters(id || $props.current)
        $emit('select', id || res[0].id)
       }
       else {
          $emit('select', 0)         
       }
    })
}
</script>

<style lang="scss" scoped>
</style>
