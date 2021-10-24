<template>
  <h1>ADD -SP</h1>
  {{ form }}
  <form-custom @submit="add_sp">
    <form-group legend="Infos Personnel">
      <input-custom placeholder="Nom" @keyup="form.personal.lastname = $event"></input-custom>
      <input-custom placeholder="Prenom" @keyup="form.personal.firstname = $event"></input-custom>
      <input-custom type="date" label="date de naissance" @change="form.personal.date = $event"></input-custom>
      <input-custom
        type="radio"
        label="sexe"
        :value="{ Homme: 'm', Femme: 'f' }"
        @change="form.personal.sexe = $event"
      ></input-custom>
      <select-custom
        label="Jobs"
        :options="data.jobs"
        key-option="job"
        key-value="id"
        @change="form.personal.job = $event"
      ></select-custom>
      <input-custom
        type="textarea"
        placeholder="introduction"
        @keyup="form.personal.introduce = $event"
      ></input-custom>
      <input-custom
        type="textarea"
        placeholder="phrase d'accroche"
        @keyup="form.personal.arrcroch_sentence = $event"
      ></input-custom>
    </form-group>
    <form-group legend="Coord Infos">
      <input-custom type="email" label="Email" @keyup="form.coord.email = $event"></input-custom>
      <input-custom type="tel" label="Telephone N*1" @keyup="form.coord.tel = $event"></input-custom>
      <input-custom type="tel" label="Telephone N*2" @keyup="form.coord.tel2 = $event"></input-custom>
      <select-custom
        label="Villes"
        :options="data.cities"
        key-option="name"
        key-value="id"
        @change="form.coord.cityId = $event"
      ></select-custom>
      <select-custom
        label="Arrondissements"
        :options="data.arrondissements"
        key-option="arrondissement"
        key-value="id"
        @change="form.coord.arrondissementId = $event"
      ></select-custom>
      <select-custom
        label="Quartiers"
        :options="data.quaters"
        key-option="quater"
        key-value="id"
        @change="form.coord.quaterId = $event"
      ></select-custom>
    </form-group>
    <form-submit-button value="ajouter"></form-submit-button>
  </form-custom>
</template>


<script setup>

import { reactive, onBeforeMount } from 'vue'
import FormCustom from '../form/FormCustom.vue';
import FormGroup from '../form/FormGroup.vue';
import InputCustom from '../form/InputCustom.vue';
import SelectCustom from '../form/SelectCustom.vue';
import FormSubmitButton from '../form/FomSubmitButton.vue';
import FetchApi from '../../utils/FetchApi';

const form = reactive({
  personal: {
    lastname: 'bouss',
    firstname: 'wuil',
    birthday: '12/10/1999',
    sexe: 'f',
    email: 'test@test.test',
    tel: '066252963',
    tel2: '066252962',
    introduce: 'the introduce',
    accroch_sentence: 'the accroch',
    job: 0
  },
  coord: {
    cityId: 31,
    arrondissementId: 4,
    quaterId: 1,
    street: 'street',
    number_adress: 98,
  }
})

const data = reactive({
  jobs: [],
  cities: [],
  arrondissements: [],
  quaters: []
})

onBeforeMount(() => {

  // FetchApi('/cities')
  //   .then(res => {
  //     data.cities = res
  //   })

})


/**
 * ajouter un nouveau presatataire dans la db
 */
function add_sp() {
  form.personal.job = 1
  form.coord.cityId = 31
  form.coord.arrondissementId = 5
  form.coord.quaterId = 2
  form.coord.number_adress = 2
  // form.personal.email = 'test@.test'
  console.log('ADD')
  FetchApi('/service-provider', 'POST', {...form.personal, ...form.coord})
    .then(res => console.log(res))
}
  
</script>

<style lang="scss" scoped>
form {
  width: 50%;
}

fieldset {
  display: flex;
  flex-direction: column;
  gap: 0.25em;

  padding: 0.5em;
}
</style>
