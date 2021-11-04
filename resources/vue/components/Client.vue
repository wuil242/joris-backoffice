<template>
<h1>clients</h1>
<button @click="reload">Reload</button>
  <pre>
    {{data}}
  </pre>
</template>


<script setup>
import {onMounted, reactive} from 'vue'
import { useStopLoading } from '../hooks/Loader';
import FetchApi from '../utils/FetchApi';

const data = reactive({
  clients: [],
  pagination: null
})


onMounted(() => {
  reload()
})

function reload() {
   FetchApi({route: '/clients'})
    .then(res => {
      data.clients = res
      useStopLoading()
    })
}
  
</script>

<style scoped>
  
</style>
