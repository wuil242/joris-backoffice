<template>
    <button @click="props.getDatas()">Recharger</button>
    <!-- <pre >{{data.cities}}</pre> -->
     <table>
       <thead>
        <tr>
          <td v-for="header in props.headers" :key="header">{{header}}</td>
        </tr>
       </thead>
       <tbody>
        <tr v-for="element in props.elements" :key="element.name">
          <td v-for="key in keys" :key="key">{{element[key]}}</td>
          <td>
            <button @click="$emit('delete')">Suprimer</button>
          </td>
        </tr>
       </tbody>
     </table>
</template>


<script setup>
import {defineProps, defineEmits, onMounted} from 'vue'
  
const props = defineProps({
  getDatas:{type: Function, required: true},
  headers: {type:Array, required: true},
  keys: {type:Array, required: true},
  elements: {type: Array, required: true}
})

defineEmits(['delete'])


onMounted(() => {
  props.getDatas()
})

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
