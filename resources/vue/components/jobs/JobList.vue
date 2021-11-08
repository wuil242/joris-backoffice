<template>
  <h2>List Job</h2>
   <router-link :to="{name: 'job_add'}">Add Job</router-link>
  <form-input type="search" :errors="[]" @keyup="filtering"></form-input>
  <ol>
    <li
      v-for="job in jobs"
      :key="job"
      :style="{ color: job.color, 'background-color': job.bg_color }"
    >{{ job.name }} | <button @click="delete_job(job.id)">Sup</button> </li>
  </ol>
</template>


<script setup>
import { ref, onMounted, watch, onBeforeUpdate } from 'vue'
import { useStopLoading } from '../../hooks/Loader';
import FetchApi from '../../utils/FetchApi';
import FormInput from '../form/FormInput.vue';

const jobs = ref([])
let jobsCache = []

onMounted(() => {
  get_jobs()
})

/**
 * @param {number} id l'identifiant du job
 */
function delete_job(id) {
  FetchApi({
    route: '/jobs/'+ id,
    method: 'DELETE',
  }).then(() => get_jobs())
}

function get_jobs() {
FetchApi({
    route: '/jobs'
  }).then(res => {
    jobsCache = jobs.value = res.data
  })
  .finally(() => useStopLoading())
}

/**
 * @param {string} value valeur de la recherche 
 */
function filtering(value) {
  if(value === '') {
    jobs.value = jobsCache
    return
  }

  jobs.value = jobsCache.filter(job => job.name.startsWith(value))
}

</script>

<style scoped>
</style>
