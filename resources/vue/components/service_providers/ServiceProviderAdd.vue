<template>
  <h1>ADD -SP</h1>
  <form-custom @submit="log">
    <form-group legend="personal infos">
      <input-custom type="radio" label="Sexe" :value="{Homme: 'm', Femme: 'f'}" @change="log"></input-custom>
      <select-custom
        label="Ville" 
        :options="options" 
        key-option="name"
        key-value="value"
        @change="log"
      ></select-custom>
       <select-custom
        label="Quartiers"
        :option-default="{name: 'Aucun', value: 0}" 
        :options="options" 
        key-option="name"
        key-value="value"
        @change="log"
      ></select-custom>
    </form-group>
    <fom-submit-button value="Ajouter"></fom-submit-button>
  </form-custom>
</template>


<script setup>
import FormCustom from '../form/FormCustom.vue'
import FormGroup from '../form/FormGroup.vue';
import InputCustom from '../form/InputCustom.vue';
import SelectCustom from '../form/SelectCustom.vue';
import FomSubmitButton from '../form/FomSubmitButton.vue';

function log(data) {
  console.log(data)
}
  
const options = [{name: 'Bz', value: 10}, {name: 'Pn', value: 5}]
</script>

<style lang="scss" scoped>
  
</style>
