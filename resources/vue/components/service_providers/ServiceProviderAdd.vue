<template>
  <h1>ADD -SP</h1>
  <form-custom @submit="add_sp">
    <form-group legend="personal infos">
      <input-custom type="radio" label="Sexe" :value="{Homme: 'm', Femme: 'f'}" @change="log"></input-custom>
      <select-custom
        label="Ville" 
        :options="options" 
        key-option="name"
        key-value="value"
      ></select-custom>
       <select-custom
        label="Quartiers"
        :option-default="{name: 'Aucun', value: 0}" 
        :options="options" 
        key-option="name"
        key-value="value"
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

import {reactive} from 'vue'
import FormCustom from '../proto/FormCustom.vue';
import InputCustom from '../form/InputCustom.vue';

const form = reactive({
  personal : {
    lastname: '',
    firstname: '',
    date: '',
    sexe: '',
    introduce: '',
    arrcroch_sentence: '',
    job: 0
  }
})


/**
 * ajouter un nouveau presatataire dans la db
 */
function add_sp() {
  console.log('ADD')
}
  
  
</script>

<style lang="scss" scoped>
  form {
    width: 50%;
  }

  fieldset {
    display: flex;
    flex-direction: column;
    gap: .25em;

    padding: .5em;

  }
</style>
