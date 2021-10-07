<template>
  <div class="arrondissements">
    <location-layout 
      label="Nom de l'arrondissement" 
      submitMessage="ajouter une ville"
      :locations="arrondissements"
      border-color="teal"
      @add="$emit('add', $event)"
      @select="$emit('select', $event)"
    >
      <h2 slot="title">Ajouter Un arrondissement</h2>
      <!-- <h2 slot="location-title">Toutes les Villes</h2> -->
      <!-- <p slot="empty-message">Aucune Ville</p> -->
    </location-layout>
  </div>
</template>


<script setup>
import LocationLayout from './LocationLayout.vue';

defineProps({
  arrondissements: {type: Object, required: true}
})

defineEmits(['add', 'select'])
  
</script>

<style lang="scss" scoped>
</style>
