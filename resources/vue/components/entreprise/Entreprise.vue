<template>
  <div>
    <h1>Test</h1>
    <router-view></router-view>
  </div>
</template>


<script setup>

import { onBeforeRouteUpdate } from 'vue-router';

onBeforeRouteUpdate((to, from, next) => {
  if(to.name === 'entreprise') {
    next('/entreprise/list')
  }
  else {
    next()
  }
})
  
</script>

<style lang="scss" scoped>

  
</style>
