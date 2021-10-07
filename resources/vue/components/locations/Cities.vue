<template>
  <div class="cities">
    <location-layout 
      label="Nom de la ville" 
      submitMessage="ajouter une ville"
      :locations="cities"
      border-color="green"
      @add="$emit('add', $event)"
      @select="$emit('select', $event)"
    >
      <h2 slot="title">Ajouter Une Ville</h2>
      <!-- <h2 slot="location-title">Toutes les Villes</h2> -->
      <!-- <p slot="empty-message">Aucune Ville</p> -->
    </location-layout>
  </div>
</template>


<script setup>
import LocationLayout from './LocationLayout.vue';

defineProps({
  cities: {type: Array, required: true}
})

defineEmits(['add', 'select'])
  
</script>

<style lang="scss" scoped>
</style>
