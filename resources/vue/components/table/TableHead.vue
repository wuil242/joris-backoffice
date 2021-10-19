<template>
   <thead>
    <tr>
      <td v-for="header in headers" :key="header">{{header}}</td>
    </tr>
  </thead>
</template>


<script setup>

/**
 * @property {string[]} headers
 */
defineProps({
  headers: {type: Array, required: true}
})
  
</script>

<style lang="scss" scoped>
  
    td {
      border: solid 4px var(--table-border);
    }
</style>
