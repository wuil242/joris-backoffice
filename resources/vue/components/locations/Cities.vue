<template>
  <div class="cities">
    <h2>Ajouter une ville</h2>
    <form @submit.prevent="$emit('add')">
      <label for="name">Nom de la ville</label>
      <input type="text" v-model="data.name">

      <input type="submit" value="Ajouter la ville">
    </form>
    <pre>{{props.cities.length}}</pre>
    <h2>Toutes les Villes</h2>
    <ul v-if="props.cities.length > 0">
      <li v-for="city in props.cities" :key="city.id">
        <a href="#" :title="city.name" @click.prevent="$emit('select', city.id)">{{city.name}}</a>
      </li>
    </ul>
    <p v-else>Aucune Ville</p>
  </div>
</template>


<script setup>
import {reactive} from 'vue'
import FetchApi from '../../utils/FetchApi';

const data = reactive({
  name: '',
  res: null,
})

const props = defineProps({
  cities: {type: Array, required: true}
})

defineEmits(['add', 'select'])

function add_city() {
  FetchApi('/api/cities', 'POST', {name: data.name})
    .then(res => {
      data.res = res
      // get_cities()
    })
}

  
</script>

<style lang="scss" scoped>
  .cities {
    border: 1px solid lime;
    padding: 1rem;

    input {
      margin: .5rem 0;
      padding: .3rem .7rem;
    }
  }
</style>
