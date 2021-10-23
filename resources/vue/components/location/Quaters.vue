<template>
  <div class="quaters">
    <location-layout 
      label="Nom de l'arrondissement" 
      submitMessage="ajouter une ville"
      :locations="data.quaters"
      :current="data.currentQuater"
      border-color="gold"
      @page-change="goto"
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
import fetchApi  from '../../utils/FetchApi';


const $props = defineProps({
  cityId: {type:Number, required: true},
  arrondissementId: {type:Number, required: true}
})


defineEmits(['add', 'select', 'delete'])

const data = reactive({
  quaters: {
    elements: [],
    pagination: []
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
    get_quaters(data.lastCity, data.lastArrondissement)
  }
})


//TODO: aller vers la bonne page apres une seupression ou un ajout
/**
 * @param {number} limit
 * @param {{elements:any[], pagination:any[]}} options
 * @param {boolean} invert
 * @returns {number}
 */
function goto_current_page(limit, {elements, pagination}, invert=false) {
   const lastPage = pagination[pagination.length - 1]
   const currentPage = pagination.filter(p => p.isActive)[0]
   const page  = elements.length === limit ? lastPage.page + 1 : currentPage.page

  goto(page === lastPage ? page : page - 1)
}

/**
 * @param {number} page
 */
function goto(page) {
  get_quaters(data.lastCity, data.lastArrondissement, null, page)
}

/**
 * @param {string} id
 */
function remove_quater(id) {
  const route = `/cities/${data.lastCity}/arrondissements/${data.lastArrondissement}/quaters`
  fetchApi({
    route, 
    method: 'DELETE',
    body: {id}
  }
  ).then(res => {
    if(res.typeCode === 1) {
      goto_current_page(res.limit, data.quaters)
    }
  })
}


/**
 * @param {string} name
 */
function add_quater(name) {
  const route = `/cities/${data.lastCity}/arrondissements/${data.lastArrondissement}/quaters`
  fetchApi({
    route, 
    method: 'POST',
    body: {name},
    alert: false
  }
  ).then(res => {
    if(res.quater) {
      data.currentQuater = res.quater.id
      goto_current_page(res.limit, data.quaters)
    }
  })
}

/**
 * @param {number} cityId
 * @param {number} arrondissementId
 * @param {null|number} id
 */
function get_quaters(cityId, arrondissementId, id = null, page=null) {
  const route = `/cities/${cityId}/arrondissements/${arrondissementId}/quaters`
   fetchApi({
     route,
     method: 'GET',
     query:  {page: page}  
   })
    .then(res => {
      data.quaters.elements = res.quaters || []
      data.quaters.pagination = res.pagination || []
       if(data.quaters.elements.length > 0) {
         data.currentQuater = id || res.quaters[0].id
       }
    })
}


</script>

<style lang="scss" scoped>
</style>
