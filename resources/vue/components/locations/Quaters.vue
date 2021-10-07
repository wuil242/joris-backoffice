<template>
  <div class="quaters">
    <location-layout 
      label="Nom de l'arrondissement" 
      submitMessage="ajouter une ville"
      :locations="quaters"
      border-color="gold"
      @add="$emit('add', $event)"
      @select="$emit('select', $event)"
      @delete="$emit('delete', $event)"
    >
    <p>{{quaters}}</p>
      <h2 slot="title">Ajouter Un arrondissement</h2>
      <!-- <h2 slot="location-title">Toutes les Villes</h2> -->
      <!-- <p slot="empty-message">Aucune Ville</p> -->
    </location-layout>
  </div>
</template>


<script setup>
import LocationLayout from './LocationLayout.vue';

defineProps({
  quaters: {type: Object, required: true}
})

defineEmits(['add', 'select', 'delete'])
  
</script>

<style lang="scss" scoped>
</style>
