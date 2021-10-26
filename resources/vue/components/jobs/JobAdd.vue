<template>
  <h2>Add Job</h2>
  <form-custom @submit="create_job">
    <form-input label="Nom du Job" @keyup="form.name = $event"></form-input>
    <form-input type="color" label="Color" @change="form.color = $event"></form-input>
    <form-input type="color" label="Background Color" @change="form.bg_color = $event"></form-input>
    <form-submit-button value="Creer"></form-submit-button>
  </form-custom>
  <section>
    <h1>Result</h1>
    <div id="job">
      <p id="job-name">{{form.name}}</p>
    </div>
  </section>
</template>


<script setup>
import FormCustom from '../form/FormCustom.vue'
import FormInput from '../form/FormInput.vue';
import FormSubmitButton from '../form/FomSubmitButton.vue';
import {reactive, computed, watch} from 'vue'
import FetchApi from '../../utils/FetchApi';

const emit = defineEmits(['add'])
  
const form = reactive({
  name: 'Test',
  color: '',
  bg_color: ''
})

const color = computed(() => form.color)
const bg_color = computed(() => form.bg_color)

function create_job() {
  FetchApi({
    route: '/jobs',
    method: 'POST',
    body: {...form},
  }).then(job => {
    emit('add')
  }).catch(err => {
    console.error(err)
  })
}

</script>

<style scoped>
  #job {
    background-color: v-bind(bg_color);
    padding: .25em;
  }

  #job-name {
    color: v-bind(color);
  }
  
</style>
