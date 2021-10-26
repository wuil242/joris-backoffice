<template>
  <div class="service-provider">
    <h1>Prestaire de service</h1>
    <router-view></router-view>
    <!-- <div class="content">
      <table-custom>
        <table-head :headers="['Nom']"></table-head>
        <table-body :elements="data.sp"></table-body>
      </table-custom>
    </div> -->
  </div>
</template>


<script setup>
//TODO: lister et ajouter des prestataire

import { reactive, ref } from 'vue';
import FormCustom from '../form/FormCustom.vue';
import FormInput from '../form/FormInput.vue';
import TableCustom from '../table/TableCustom.vue';
import TableHead from '../table/TableHead.vue';
import TableBody from '../table/TableBody.vue';

const form = ref({
  name: 'ok',
  introduce: '',
  date: ''
})

const headers = ['Nom', 'Prenom', 'age']
// const keys = ['name']

const personalFields = {
  lastname: {
    label: 'Nom',
    placeholder: 'Nom',
    name: 'lastname',
  },
  firstname: {
    label: 'Prenom',
    placeholder: 'Prenom',
    name: 'firstname',
  },
  date: {
    label: 'Date de naissance',
    placeholder: 'Date de naissance',
    name: 'date',
    type: 'date',
  },
  sexe: {
    label: 'Sexe',
    placeholder: 'Sexe',
    name: 'sexe',
    type: 'radio',
    elements: [{label: 'Homme', value: 'm'}, {label:'Femme', value: 'f', default: true}],
    value: ''
  },
  introduce: {
    label: 'Presentation',
    placeholder: 'Presentation',
    name: 'introduce',
    type: 'textarea',
  },
  accroch_sentence: {
    label: 'Phrase d\'accroche',
    placeholder: 'Phrase d\'accroche',
    name: 'accroch_sentence',
  },
  job: {
    label: 'Metier',
    placeholder: 'Metier',
    name: 'job',
    type: 'select',
    elements: [{option: 'Plombier', value: 1}]
  },
}

const coordFields = {
  email: {
    label: 'Email',
    placeholder: 'Email',
    name: 'email',
    type: 'email',
  },
  tel: {
    label: 'Telephone 1',
    placeholder: 'Telephone 1',
    name: 'tel',
    type: 'tel',
  },
  tel2: {
    label: 'Telephone 2',
    placeholder: 'Telephone 2',
    name: 'tel2',
    type: 'tel',
  },
  city: {
    label: 'Ville',
    placeholder: 'Ville',
    name: 'city',
    type: 'select',
    elements: [{option: 'bz', value: 1}]
  },
  arr: {
    label: 'Arrondissements',
    placeholder: 'Arrondissements',
    name: 'arrondissement',
    type: 'select',
    elements: [{option: 'mfilou', value: 1}],
    default: {option: 'Aucun', value: 0}
  },
  quater: {
    label: 'Quartier',
    placeholder: 'Quartier',
    name: 'quater',
    type: 'select',
    elements: [{option: 'pk', value: 1}],
    default: {option: 'Aucun', value: 0}
  },
  street: {
    label: 'Rue',
    placeholder: 'Rue',
    name: 'street',
    type: 'text',
  },
  nbre: {
    label: 'Numero',
    placeholder: 'Numero',
    name: 'nbre',
    type: 'number',
  },
}

const forms = ref([
  {
    title: 'Infos Personnelles',
    fields: personalFields
  },
  {
    title: 'Adress',
    fields: coordFields
  }
])

const sp = []

const data = reactive({
  sp: [{name: 'test'}, {name: 'roas'}],
  test: 'ok'
})

</script>

<style lang="scss" scoped>
  .service-provider {

    .content {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
    }
  }
</style>
