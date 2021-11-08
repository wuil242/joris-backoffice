<template>
  <article class="job-add">
    <router-link :to="{name: 'job_list'}">Close</router-link>
    <hr>
    <section class="job-add-form">
      <h2>Add Job</h2>
      <form-custom class="job-add-form" @submit="create_job">
        <form-input label="Nom du Job" :errors="[]" v-model:value="data.name"></form-input>
        <form-input type="color" label="Color" :errors="[]" v-model:value="data.color"></form-input>
        <form-input
          type="color"
          label="Background-Color"
          :errors="[]"
          v-model:value="data.bg_color"
        ></form-input>
        <form-submit-button>Creer</form-submit-button>
      </form-custom>
    </section>
    <section class="job-add-result">
      <h1>Result</h1>
      <div id="job">
        <p id="job-name">{{ data.name }}</p>
      </div>
    </section>
  </article>
</template>


<script setup>
import FormCustom from '../form/FormCustom.vue'
import FormInput from '../form/FormInput.vue';
import FormSubmitButton from '../form/FormSubmitButton.vue';
import { reactive, computed } from 'vue'
import FetchApi from '../../utils/FetchApi';
import { useRouter } from 'vue-router';

const data = reactive({
  name: 'Test',
  color: '',
  bg_color: ''
})

const color = computed(() => data.color)
const bg_color = computed(() => data.bg_color)

function create_job() {
  FetchApi({
    route: '/jobs',
    method: 'POST',
    body: { ...data },
  }).then(async (job) => {
    console.log('ADD_JOB', job)
    await useRouter().push('/jobs')
  }).catch(err => {
    console.error(err)
  })
}

</script>

<style scoped>
#job {
  background-color: v-bind(bg_color);
  padding: 0.25em;
}

#job-name {
  color: v-bind(color);
}
</style>
