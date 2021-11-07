<template>
  <h1>Temoignage</h1>
  <pre>
    {{data}}
  </pre>

  <form-custom class="temoignage-form"  @submit="create_temoignage" :reset="reset">
    <form-input label="Name" placeholder="Nom" :errors="data.errors.name" v-model:value="data.name"></form-input>
    <form-textarea label="Message" placeholder="Message"  :errors="data.errors.message" v-model:value="data.message"></form-textarea>
    <form-submit-button>Ceer</form-submit-button>
  </form-custom>
</template>


<script setup>
import {ref, reactive, onMounted} from 'vue'
import { useStartLoading, useStopLoading } from '../hooks/Loader';
import FetchApi from '../utils/FetchApi';
import FormCustom from './form/FormCustom.vue';
import FormInput from './form/FormInput.vue';
import FormTextarea from './form/FormTextarea.vue';
import FormSubmitButton from './form/FormSubmitButton.vue';

const data = reactive({
  temoignages: [],
  name: '',
  message: '',
  errors: {
    name: [],
    message: []
  }
})

const reset = ref(false)


onMounted(() => {
  get_all_temoignage()
})

function create_temoignage() {
  reset.value = false
  useStartLoading()
  for (const error in data.errors) {
    data.errors[error] = []
  }
  const body = {name: data.name, message: data.message}
  return FetchApi({route: '/temoignages', method: 'POST', body})
    .then(({errors}) => {
      if(errors && errors.length > 0) {
        for (const {field, message} of errors) {
          data.errors[field] = message.split('|')  
        }
      }else {
        reset.value = true
      }
    })
    .finally(() => get_all_temoignage())
}

function get_all_temoignage() {
  FetchApi({route: '/temoignages'})
    .then(res => {
      console.log(res)
      data.temoignages = res
    })
    .finally(() => useStopLoading())
}
  
</script>

<style scoped>
  .temoignage-form {
    width: 50%;
    display: flex;
    justify-content: start;
    gap: 15px;
    flex-direction: column;
  }
</style>
