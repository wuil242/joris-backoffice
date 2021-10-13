<template>
  <div class="cities">
    <location-layout 
      label="Nom de la ville" 
      submitMessage="ajouter une ville"
      :locations="data.cities"
      :errors="data.errors"
      :current="current"
      border-color="navy"
      @add="add_city"
      @select="$emit('select', $event)"
      @delete="remove_city"
    >
    <template slot="empty-message">
      <h2>Ajouter Une Ville</h2>
    </template>
      <!-- <h2 slot="location-title">Toutes les Villes</h2> -->
      <!-- <p slot="empty-message">Aucune Ville</p> -->
    </location-layout>
  </div>
</template>


<script setup>
import LocationLayout from './LocationLayout.vue';
import {reactive, onMounted} from 'vue'
import FetchApi from '../../utils/FetchApi';

const $props = defineProps({
  current: {type:Number, required: true}
})

const $emit = defineEmits(['add', 'select', 'delete'])

const data = reactive({
  cities: {
    elements: [],
  },
  errors: []
})

onMounted(() => {
  get_cities()
})


/**
 * @param {number} cityId
 */
function remove_city(cityId) {
  FetchApi('/cities', 'DELETE', {cityId})
    .then(res => {
      // store.commit('alert', res)
      if(res.type === 'success') {
        data.cities.elements = data.cities.elements.filter(city => city.id !== cityId)
        if(data.cities.elements.length > 0) {
          //get_arrondissemets(data.cities.elements[0].id)
          $emit('select', data.cities.elements[0].id)
        }
      }
    })
}

/**
 * @param {null|number} id
 */
function get_cities(id = null) {
  FetchApi('/cities')
    .then(res => {
      data.cities.elements = res    
      if(res.length > 0) {
        // $props.current = res[0].id 
        // get_arrondissemets(id || res[0].id)
        $emit('select', id || res[0].id)
      }
    })
}

function add_city(name) {
  FetchApi('/cities', 'POST', {name})
    .then(res => {
      if(res.type) {
        // store.commit('alert', res)
        return
      }

      // data.cities.elements.push(res)
      // console.log(res)
      get_cities(res.id)
      // store.commit('alert', {type:'success', message: `la ville "${res.name}" a bien ete ajouter`})
    })
}
  
</script>

<style lang="scss" scoped>
</style>
