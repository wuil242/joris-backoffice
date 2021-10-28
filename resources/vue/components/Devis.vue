<template>
  <h1>Devis</h1>
  <!-- {{data}} -->
  <table-custom>
    <table-head :headers="['id']"></table-head>
    <table-body :elements="data.devis"></table-body>
  </table-custom>
</template>


<script setup>
import {reactive, onMounted} from 'vue'
import FetchApi from '../utils/FetchApi'
import TableCustom from './table/TableCustom.vue'
import TableHead from './table/TableHead.vue'
import TableBody from './table/TableBody.vue'

const data = reactive({
  devis: []
})

onMounted(() => {
  get_all_devis(data)
})

/**
 * @param {{devis: []}} data
 */
function get_all_devis(data) {
  FetchApi({route: '/devis'})
    .then(res => {
      data.devis = res.data
    })
}
  
</script>

<style lang="scss" scoped>
  
</style>
