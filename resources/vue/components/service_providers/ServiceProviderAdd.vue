<template>
  <h1>ADD -SP</h1>
  <form-custom @submit="add_sp">
    <fieldset >
      <legend>Infos Personnel</legend>
      <input-custom placeholder="Nom" @keyup="form.personal.lastname = $event"></input-custom>
      <input-custom placeholder="Prenom" @keyup="form.personal.firstname = $event"></input-custom>
      <input-custom type="date" label="date de naissance" @change="form.personal.date = $event"></input-custom>
      <input-custom type="radio" label="sexe" :value="{Homme: 'm', Femme: 'f'}" @change="form.personal.sexe = $event"></input-custom>
      <!-- ajout du champ de selection multiple pur les Job de prestataire  -->
      <input-custom type="textarea" placeholder="introduction" @keyup="form.personal.introduce = $event"></input-custom>
      <input-custom type="textarea" placeholder="phrase d'accroche" @keyup="form.personal.arrcroch_sentence = $event"></input-custom>
    </fieldset>
    <button type="submit">SEND</button>
  </form-custom>
</template>


<script setup>

import { reactive } from 'vue'
import FormCustom from '../form/FormCustom.vue';
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
