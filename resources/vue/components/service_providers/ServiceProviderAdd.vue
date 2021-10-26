<template>
  <h1>ADD -SP</h1>
  {{ form }}
  <form-custom @submit="add_sp">
    <form-group legend="Infos Personnel">
      <form-input placeholder="Nom" @keyup="form.personal.lastname = $event"></form-input>
      <form-input placeholder="Prenom" @keyup="form.personal.firstname = $event"></form-input>
      <form-input type="date" label="date de naissance" @change="form.personal.date = $event"></form-input>
      <form-input
        type="radio"
        label="sexe"
        :value="{ Homme: 'm', Femme: 'f' }"
        @change="form.personal.sexe = $event"
      ></form-input>
      <form-select
        label="Jobs"
        :options="data.jobs"
        key-option="name"
        key-value="id"
        @change="form.personal.job = $event"
      ></form-select>
      <form-input
        type="textarea"
        placeholder="introduction"
        @keyup="form.personal.introduce = $event"
      ></form-input>
      <form-input
        type="textarea"
        placeholder="phrase d'accroche"
        @keyup="form.personal.arrcroch_sentence = $event"
      ></form-input>
    </form-group>
    <form-group legend="Coord Infos">
      <form-input type="email" label="Email" @keyup="form.coord.email = $event"></form-input>
      <form-input type="tel" label="Telephone N*1" @keyup="form.coord.tel = $event"></form-input>
      <form-input type="tel" label="Telephone N*2" @keyup="form.coord.tel2 = $event"></form-input>
      <form-select
        label="Villes"
        :option-default="defaultOption"
        :options="data.cities"
        key-option="name"
        key-value="id"
        @change="form.coord.cityId = $event"
      ></form-select>
      <form-select
        label="Arrondissements"
        :options="data.arrondissements"
        key-option="arrondissement"
        key-value="id"
        @change="form.coord.arrondissementId = $event"
      ></form-select>
      <form-select
        label="Quartiers"
        :options="data.quaters"
        key-option="quater"
        key-value="id"
        @change="form.coord.quaterId = $event"
      ></form-select>
    </form-group>
    <form-submit-button value="ajouter"></form-submit-button>
  </form-custom>
</template>


<script setup>

import { reactive, onBeforeMount } from 'vue'
import FormCustom from '../form/FormCustom.vue';
import FormGroup from '../form/FormGroup.vue';
import FormInput from '../form/FormInput.vue';
import FormSelect from '../form/FormSelect.vue';
import FormSubmitButton from '../form/FomSubmitButton.vue';
import FetchApi from '../../utils/FetchApi';

const defaultOption = {name: 'Aucun', id: 0}

const form = reactive({
  personal: {
    lastname: 'bouss',
    firstname: 'wuil',
    birthday: '01/01/2000',
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

  FetchApi({route: '/jobs'})
    .then(res => {
      data.jobs = res.data
    })
    .then(() => {
      return FetchApi({route: '/cities'})
        .then(res => {
          data.cities = res
        })
    }).then(() => {
    })


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
  console.log('ADD', form.personal.birthday)
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
