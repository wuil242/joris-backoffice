<template>
<div class="app">
  <alert></alert>
  <!-- <login v-if="!store.state.user"></login> -->
  <!-- <home v-else></home> -->
  <home></home>
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
  * {
    margin: 0;
    padding: 0;
  }

  // .app {
  //   padding: 1rem;
  // }
</style>


