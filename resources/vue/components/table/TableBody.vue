<template>
  <tbody>
    <tr v-for="element in elements" :key="element">
      <td v-for="value in element" :key="value">{{value}}</td>
    </tr>
  </tbody>
</template>


<script setup>

defineProps({
  elements: {type: Array, required: true}
})
  
</script>

<style lang="scss" scoped>
  
    td {
      border: solid 4px var(--table-border);
    }
</style>
