<template>
<div v-if="elements.length > 0">
    <button @click="$emit('refresh')">Recharger</button>
    <form @keyup="searching" v-if="searchKeys.length > 0">
      <input type="search" placeholder="search..." v-model="data.search">
    </form>
     <table>
       <thead>
        <tr>
          <td v-for="header in headers" :key="header">{{header}}</td>
          <td>Actions</td>
        </tr>
       </thead>
       <tbody>
         <tr v-for="element in data.elements" :key="element.name">
            <td v-if="keys.length > 0" v-for="key in keys" :key="key">
              {{typeof key === 'string' ? element[key] : element[key[0]][key[1]]}}
            </td>
            <td v-else v-for="el in element" :key="el">
              {{el}}
            </td>
            <td>Actions</td>
            <td>Actions</td>
            <td :colspan="elements.length - 1">
              <button @click="$emit('delete')">Suprimer</button>
            </td>
        </tr>
       </tbody>
     </table>
</div>
<p v-else>Tableau Vide</p>  
</template>


<script setup>
import {onMounted, reactive} from 'vue'
  
const props = defineProps({
  headers: {type:Array, required: true},
  keys: {type:Array, default: []},
  elements: {type: Array, required: true},
  searchKeys: {type: Array, default: []}
})

defineEmits(['delete', 'refresh'])

const data = reactive({
  elements: props.elements,
  search: ''
})

/**
 * filtre le tableau suivant le mot taper dans la recherche
 */
function searching () {
  if(data.search === '') {
    data.elements = props.elements
  }
  else {
    props.searchKeys.forEach(key => {
      data.elements = data.elements.filter(el => el[key].match(new RegExp(`[${data.search}]`)))
    })
  }
}

</script>

<style lang="scss" scoped>
  table  {
    border-collapse: collapse;

    td {
      padding: .5rem;
      border: 1px solid black;
    }

    tbody tr:nth-child(2n) {
      background-color: grey;
      color: white;
    }
  }
</style>
