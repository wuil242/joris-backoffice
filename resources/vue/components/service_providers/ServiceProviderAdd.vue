<template>
  <h1>ADD -SP</h1>
  {{ form }}
  <form-custom @submit="add_sp">
     <form-group legend="Infos Personnel">
       <form-input placeholder="Nom" v-model:value="form.personal.lastname"></form-input>
      <form-input placeholder="Prenom" v-model:value="form.personal.firstname"></form-input>
      <form-input type="date" label="date de naissance" v-model:value="form.personal.date"></form-input>
      <form-select label="Sexe"
        :options="[{option: 'Femme', value:'f'}, {option: 'Homme', value: 'm'}, ]"
        v-model:value="form.personal.sexe"
        ></form-select>
      <form-select
        label="Jobs"
        :options="data.jobs"
        key-option="name"
        key-value="id"
        v-model:value="form.personal.jobId"
      ></form-select>
      <form-textarea
        placeholder="introduction"
        v-model:value="form.personal.introduce"
      ></form-textarea>
      <form-input
        type="textarea"
        placeholder="phrase d'accroche"
        v-model:value="form.personal.arrcroch_sentence"
      ></form-input>
    </form-group>
    
     <form-group legend="Coord Infos">
      <form-input type="email" label="Email" v-model:value="form.coord.email"></form-input>
      <form-input type="tel" label="Telephone N*1" v-model:value="form.coord.tel"></form-input>
      <form-input type="tel" label="Telephone N*2" v-model:value="form.coord.tel2"></form-input>
      <form-select
        label="Villes"
        :option-default="defaultOption"
        :options="data.cities"
        key-option="name"
        key-value="id"
        v-model:value="form.coord.cityId"
      ></form-select>
      <form-select
        label="Arrondissements"
        :options="data.arrondissements"
        key-option="arrondissement"
        key-value="id"
        v-model:value="form.coord.arrondissementId"
      ></form-select>
      <form-select
        label="Quartiers"
        :options="data.quaters"
        key-option="quater"
        key-value="id"
        v-model:value="form.coord.quaterId"
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
import FormTextarea from '../form/FormTextarea.vue';
import FormSelect from '../form/FormSelect.vue';
import FormSubmitButton from '../form/FomSubmitButton.vue';
import FetchApi from '../../utils/FetchApi';

const defaultOption = {name: 'Aucun', id: 0}

const form = reactive({
  personal: {
    lastname: 'bouss',
    firstname: 'wuil',
    birthday: '5/01/2000',
    sexe: 'f',
    email: 'test@test.test',
    tel: '066252963',
    tel2: '066252962',
    introduce: 'the introduce',
    accroch_sentence: 'the accroch',
    jobId: 0
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
      if(data.jobs.length > 0) {
        form.personal.jobId = data.jobs[0].id
      }
    })
    .then(() => {
      return FetchApi({route: '/cities'})
        .then(res => {
          data.cities = res
          form.personal.cityId = data.cities[0].id
        })
    }).then(() => {
      get_arrondissements(form.coord.cityId)
    })


})

function get_arrondissements() {
  
}


/**
 * ajouter un nouveau presatataire dans la db
 */
function add_sp() {
  form.personal.jobId = 1
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
