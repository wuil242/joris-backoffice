<template>
  <fieldset>
    <legend>{{legend}}</legend>
    <slot></slot>
  </fieldset>
</template>


<script setup>

defineProps({
  legend: {type: String, required: true}
})
  
</script>

<style lang="scss" scoped>
  
</style>
