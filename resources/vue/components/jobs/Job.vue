<template>
  <h1>Jobs</h1>
  <div class="job">
    <div class="job-list" :jobs="jobs">
      <job-list></job-list>
    </div>
    <div class="job-form">
      <job-add @add="update_job_list"></job-add>
    </div>
  </div>
</template>


<script setup>
//TODO: recharger automatiquement la liste des jobs lorsqu'une nouvelle est crée
import JobList from './JobList.vue';
import JobAdd from './JobAdd.vue';
import {ref} from 'vue'
import FetchApi from '../../utils/FetchApi';

const jobs = ref([])

function update_job_list() {
  FetchApi({
    route: '/jobs'
  }).then(res => {
    jobs.value = res.data
    console.log(jobs.value.length)
  })
}

</script>

<style scoped>
  .job {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-areas: "list form";
    gap: 10px;
  }

  .job-list {
    grid-area: list;
  }

  .job-form {
    grid-area: form;
  }
</style>
