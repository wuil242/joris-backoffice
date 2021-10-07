<template>
  <div class="arrondissement">
    <h1>Toute les Villes</h1>
    <my-table :headers="headers" :keys="keys" :elements="data.arrondissements" :get-datas="get_arrondissements"></my-table>
    <hr>
    <h2>Ajouter une ville</h2>
    <form @submit.prevent="add_arrondissement">
      <select v-model="data.cityId">
        <option v-for="city in data.cities" :key="city.id"  :value="city.id">{{city.name}}</option>
      </select>
      <label for="name">Nom de la ville</label>
      <input type="text" v-model="data.name">

      <input type="submit" value="Ajouter la ville">
    </form>
    {{data.res}}
  </div>
</template>


<script setup>

import {reactive, onMounted} from 'vue'
import { useStore } from 'vuex';
import FetchApi from '../../utils/FetchApi';
import MyTable from '../MyTable.vue'
  
const headers = ['id', 'nom', 'ville', 'date de creation', 'date de mise a jour', 'actions']
const keys = ['id', 'name',['city', 'name'], 'created_at', 'updated_at']
const data = reactive({
  name: '',
  cityId: 0,
  arrondissements: [],
  cities: [],
  res: null
})

const store = useStore()


onMounted(() => {
  FetchApi('/api/cities').then(res => {
    data.cities = res
    data.cityId = res[0].id
  })
})

function get_arrondissements() {
  FetchApi('/api/arrondissements')
    .then(res => {
      if(res.type) {
        // store.commit('alert', res)
        return
      }
      data.arrondissements = res
    })

}

function add_arrondissement() {
  FetchApi('/api/arrondissements', 'POST', {name: data.name, cityId: data.cityId})
    .then(res => {
      data.res = res
      get_arrondissements()
    })
    
}

</script>

<style lang="scss" scoped>
  .arrondissement {
    border: 1px solid teal;
    padding: 1rem;

    input {
      margin: .5rem 0;
      padding: .3rem .7rem;
    }
  }
</style>
