<template>
  <h1>ADD -SP</h1>
  {{color}}
  <form-custom>
    <form-input type="color" v-model:value="color"></form-input>
    <button type="reset">RR</button>
  </form-custom>
  {{ form }}
  <form-custom :onSubmit="create_service_provider" :reset="data.reset">
    <form-group legend="Infos Personnel">
      <form-input placeholder="Nom" v-model:value="form.personal.lastname"></form-input>
      <form-input placeholder="Prenom" v-model:value="form.personal.firstname"></form-input>
      <form-input type="date" label="date de naissance" v-model:value="form.personal.birthday"></form-input>
      <form-select
        label="Sexe"
        :options="[{ option: 'Femme', value: 'f' }, { option: 'Homme', value: 'm' },]"
        v-model:value="form.personal.sexe"
      ></form-select>
      <form-select
        label="Jobs"
        :options="data.jobs"
        key-option="name"
        key-value="id"
        v-model:value="form.personal.jobId"
      ></form-select>
      <form-textarea placeholder="introduction" v-model:value="form.personal.introduce"></form-textarea>
      <form-textarea
        placeholder="phrase d'accroche"
        v-model:value="form.personal.accroch_sentence"
      ></form-textarea>
    </form-group>

    <form-group legend="Coord Infos">
      <form-input type="email" label="Email" v-model:value="form.coord.email"></form-input>
      <form-input type="tel" label="Telephone N*1" v-model:value="form.coord.tel"></form-input>
      <form-input type="tel" label="Telephone N*2" v-model:value="form.coord.tel2"></form-input>
      <form-select
        label="Villes"
        :options="data.cities"
        key-option="name"
        key-value="id"
        v-model:value="form.coord.cityId"
        @update:value="get_arrondissements(form.coord.cityId)"
      ></form-select>
      <form-select
        label="Arrondissements"
        :options="data.arrondissements"
        key-option="name"
        key-value="id"
        v-model:value="form.coord.arrondissementId"
        @update:value="get_quaters(form.coord.cityId, form.coord.arrondissementId)"
      ></form-select>
      <form-select
        label="Quartiers"
        :options="data.quaters"
        key-option="name"
        key-value="id"
        v-model:value="form.coord.quaterId"
      ></form-select>
    </form-group>
    <form-submit-button value="ajouter"></form-submit-button>
  </form-custom>
</template>


<script setup>

import { reactive, onBeforeMount, ref } from 'vue'
import FormCustom from '../form/FormCustom.vue';
import FormGroup from '../form/FormGroup.vue';
import FormInput from '../form/FormInput.vue';
import FormTextarea from '../form/FormTextarea.vue';
import FormSelect from '../form/FormSelect.vue';
import FormSubmitButton from '../form/FomSubmitButton.vue';
import FetchApi from '../../utils/FetchApi';
import { useGetArrondissements, useGetCities, useGetQuaters } from '../../hooks/Location';
import { useCreateProvider } from '../../hooks/ServiceProvider';

const color = ref('#000000')

const form = reactive({
  personal: {
    lastname: 'bouss',
    firstname: 'wuil',
    sexe: 'f',  
    birthday: '2000-5-21',
    introduce: 'the introduce',
    accroch_sentence: 'the accroch',
    jobId: 0
  },
  coord: {
    email: 'test@test.test',
    tel: '066252963',
    tel2: '066252962',
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
  quaters: [],
  reset: true
})

onBeforeMount(() => {
  get_jobs().then(() => get_cities())
})

function get_jobs() {
  return FetchApi({ route: '/jobs' })
    .then(res => {
      data.jobs = res.data
      if (data.jobs.length > 0) {
        form.personal.jobId = data.jobs[0].id
      }
    })
}

function get_cities() {
  useGetCities()
    .then(res => {
      const cityId = fill_location('cities', 'cityId', res || [])
      return Promise.resolve(cityId)
    })
    .then(cityId =>  get_arrondissements(cityId))
}

/**
 * @param {number} cityId
 */
function get_arrondissements(cityId) {
  return useGetArrondissements(cityId)
    .then(({ arrondissements }) => {
      const arrondissementId = fill_location('arrondissements', 'arrondissementId', arrondissements || [])
      return Promise.resolve(arrondissementId)
    }).then(arrondissementId => get_quaters(cityId, arrondissementId))
}

/**
 * @param {number} cityId
 * @param {number} arrondissementId
 */
function get_quaters(cityId, arrondissementId) {
  useGetQuaters(cityId, arrondissementId)
    .then(({ quaters }) => {
      fill_location('quaters', 'quaterId', quaters || [])
    })
}


/**
 * @param {'cities'|'arrondissements'|'quaters'} dataType
 * @param {'citiId'|'arrondissementId'|'quaterId'} coordType
 * @param {object} value
 * @returns {number} id du premeier element
 */
function fill_location(dataType, coordType, value) {
  data[dataType] = value
  if (data[dataType].length <= 0) {
    data[dataType] = [{ name: dataType === 'cities' ? 'Aucune' : 'Aucnun', id: 0 }]
  }
  return form.coord[coordType] = data[dataType][0].id
}

/**
 * ajouter un nouveau presatataire dans la db
 * @returns {Promsise<void>}
 */
function create_service_provider() {
  return useCreateProvider({ ...form.personal, ...form.coord })
    .then(res => {
      if(res.type === 'error') {
        data.reset = false
      }
      else if(res.type === 'success') {
        data.reset = true
      }
    })
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
