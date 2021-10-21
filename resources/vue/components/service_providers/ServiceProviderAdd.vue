<template>
  <h1>ADD -SP</h1>
  <form-custom>
    <form-group legend="personal infos">
      <input-custom type="radio" label="Sexe" :value="{Homme: 'm', Femme: 'f'}" @change="log"></input-custom>
    </form-group>
  </form-custom>
</template>


<script setup>
import FormCustom from '../form/FormCustom.vue'
import FormGroup from '../form/FormGroup.vue';
import InputCustom from '../form/InputCustom.vue';

function log(data) {
  console.log(data)
}
  
</script>

<style lang="scss" scoped>
  
</style>
