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
        key-option="city"
        key-value="id"
        @change="form.coord.city = $event"
      ></select-custom>
      <select-custom
        label="Arrondissements"
        :options="data.arrondissements"
        key-option="arrondissement"
        key-value="id"
        @change="form.coord.arrondissement = $event"
      ></select-custom>
      <select-custom
        label="Quartiers"
        :options="data.quaters"
        key-option="quater"
        key-value="id"
        @change="form.coord.quater = $event"
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
    date: '12/10/1999',
    sexe: 'm',
    introduce: 'the introduce',
    arrcroch_sentence: 'the accroch',
    job: 0
  },
  coord: {
    email: 'test@test.test',
    tel: '066252963',
    tel2: '066252963',
    city: 0,
    arrondissement: 0,
    quater: 0,
    street: 'street',
    number: 0,
  }
})

const data = reactive({
  jobs: [],
  cities: [],
  arrondissements: [],
  quaters: []
})

onBeforeMount(() => {
  const limit = 10
  for (let i = 0; i < limit; i++) {
    const id = i + 1
    data.jobs.push({ job: 'job-' + id, id })
    data.cities.push({ city: 'city-' + id, id })
    data.arrondissements.push({ arrondissement: 'arrondissement-' + id, id })
    data.quaters.push({ quater: 'quater-' + id, id })
  }
})


/**
 * ajouter un nouveau presatataire dans la db
 */
function add_sp() {
  console.log('ADD', )
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
