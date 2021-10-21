<template>
  <h1>ADD -SP</h1>
  <form-custom>
    <form-group legend="personal infos">
      <input-custom type="radio" label="Sexe" :value="{Homme: 'm', Femme: 'f'}" @change="log"></input-custom>
      <select-custom 
        :options="options" 
        key-option="name"
        key-value="value"
        @change="log"
      ></select-custom>
       <select-custom
        :option-default="{name: 'Aucun', value: 0}" 
        :options="options" 
        key-option="name"
        key-value="value"
        @change="log"
      ></select-custom>
    </form-group>
  </form-custom>
</template>


<script setup>
import FormCustom from '../form/FormCustom.vue'
import FormGroup from '../form/FormGroup.vue';
import InputCustom from '../form/InputCustom.vue';
import SelectCustom from '../form/SelectCustom.vue';

function log(data) {
  console.log(data)
}
  
const options = [{name: 'Bz', value: 10}, {name: 'Pn', value: 5}]
</script>

<style lang="scss" scoped>
  
</style>
