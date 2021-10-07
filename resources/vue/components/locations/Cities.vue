<template>
  <div class="cities">
    <location-layout 
      label="Nom de la ville" 
      submitMessage="ajouter une ville"
      :locations="cities"
      border-color="navy"
      @add="$emit('add', $event)"
      @select="$emit('select', $event)"
      @delete="$emit('delete', $event)"
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
  cities: {type: Object, required: true}
})

defineEmits(['add', 'select', 'delete'])
  
</script>

<style lang="scss" scoped>
</style>
