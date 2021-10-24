<template>
  <table-custom>
    <table-head :headers="['Nom', 'Prenom']"></table-head>
    <table-body :elements="sp" :keys="['lastname', 'firstname', 'email', 'tel', 'tel2', 'birthday']"></table-body>
  </table-custom>
  <hr>
    <pre>
    {{sp}}
  </pre>

</template>


<script setup>

import { onMounted, ref } from 'vue';
import {useGetAllProvider}  from '../../hooks/ServiceProvider.js'
import TableCustom from '../table/TableCustom.vue'
import TableBody from '../table/TableBody.vue'
import TableHead from '../table/TableHead.vue'

const sp = ref([])

onMounted(() => {
  useGetAllProvider().then(res => {
    sp.value = res.data
  })
})
  
</script>

<style lang="scss" scoped>
  
</style>


