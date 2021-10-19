<template>
  <button @click="store.dispatch('toggle')">
    Dark Mode <i :class="store.state.theme === '' ? 'fa' : 'far' " class="fa-moon"></i>
  </button>
</template>


<script setup>
import { useStore } from 'vuex';


const store = useStore()
  
</script>

<style lang="scss" scoped>
  
</style>
