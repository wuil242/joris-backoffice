<template>
  <div class="city">
    <h1>Toute les Villes</h1>
    <my-table :headers="headers" :keys="keys" :elements="data.cities" :get-datas="get_cities"></my-table>
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
import MyTable from '../MyTable.vue'
  
const headers = ['id', 'nom', 'date de creation', 'date de mise a jour', 'actions']
const keys = ['id', 'name', 'created_at', 'updated_at']
const data = reactive({
  name: '',
  cities: [],
  res: null
})

function get_cities() {
  FetchApi('/api/cities')
    .then(res => {
      data.cities = res
    })
}

function add_city() {
  FetchApi('/api/cities', 'POST', {name: data.name})
    .then(res => {
      data.res = res
      get_cities()
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
  }
</style>
