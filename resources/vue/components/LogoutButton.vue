<template>
  <button class="logout-button" @click="logout">Logout</button>
</template>


<script setup>

import { useStore } from 'vuex';
import FetchApi from '../utils/FetchApi';

const store = useStore()


function logout() {
  store.dispatch('logout')
}
</script>


<style scoped>
  .logout-button {
     padding: .4em .7em;
      cursor: pointer;
      background-color: rgb(243, 39, 39);
      color: white;
      border: none;
      box-shadow: 0 0 1px 0 black;
      border-radius: 4px;
  }
</style>
