<template>
  <h1>Stat</h1>
  <div>
    <!-- icon="ellipsis-v" -->
    <button @click="toggle">
      <icon color="#0303a7" size="2em" :icon="'toggle-'+ icon" ></icon>
    </button>
  </div>
</template>


<script setup>
import {ref} from 'vue'
import Icon from './FontAwesome.vue';

const icon = ref('off')

function toggle() {
  icon.value = icon.value === 'on' ? 'off' : 'on'
}
  
</script>

<style scoped>
</style>
