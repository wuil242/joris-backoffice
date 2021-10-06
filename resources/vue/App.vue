<template>
<div>
  <alert></alert>
  <h1>APP</h1>
    <login v-if="!store.state.user"></login>
    <home v-else></home>
</div>
</template>

<script setup>
import { useStore } from 'vuex';
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Alert from './components/Alert.vue'

const store = useStore()

</script>

<style lang="scss">
</style>


