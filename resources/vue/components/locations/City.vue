<template>
  <div class="city">
    <h1>Toute les Villes</h1>
    <pre >{{data.cities}}</pre>
     <table>
       <thead>
         <td>
           <tr>id</tr>
        </td>
        <td>
          <tr>Nom</tr>
        </td>
        <td>
          <tr>date de creattion</tr>
        </td>
        <td>
          <tr>date de mise a jour</tr>
        </td>
        <td>
          <tr>Actions</tr>
        </td>
       </thead>
     </table>
    <hr>
    <h2>Ajouter une ville</h2>
    <form @submit.prevent="add_city">
      <label for="name">Nom de la ville</label>
      <input type="text" v-model="data.name">

      <input type="submit" value="Ajouter la ville">
    </form>
    {{data.res}}
  </div>
</template>


<script setup>

import {reactive, onMounted} from 'vue'
import FetchApi from '../../utils/FetchApi';
  
const data = reactive({
  name: '',
  cities: [],
  res: null
})

onMounted(() => {
  get_cities()
})

function get_cities() {
  FetchApi('/api/cities')
    .then(res => {
      data.cities = res
      get_cities()
    })
}

function add_city() {
  FetchApi('/api/cities', 'POST', {name: data.name})
    .then(res => {
      data.res = res
    })
}

</script>

<style lang="scss" scoped>
  .city {
    border: 1px solid lime;
    padding: 1rem;

    input {
      margin: .5rem 0;
      padding: .3rem .7rem;
    }

    table {
      border-collapse: collapse;
    }
  }
</style>
