<template>
  <tbody>
    <tr v-for="element in elements" :key="element">
      <template v-if="keys.length > 0">
        <td v-for="key in keys" :key="key">{{element[key]}}</td>
      </template>
      <template v-else>
        <td v-for="value in element" :key="value">{{value}}</td>
      </template>
    </tr>
  </tbody>
</template>


<script setup>

defineProps({
  elements: {type: Array, required: true},
  keys: {type: Array, default: []}
})
  
</script>

<style lang="scss" scoped>
  
    td {
      border: solid 4px var(--table-border);
    }
</style>
