<template>
   <form @submit.prevent="sign_up">
      <label for="name">Name</label>
      <input type="name" v-model="data.name">
      <label for="email">Email</label>
      <input type="email" v-model="data.email">
      <label for="password">Password</label>
      <input type="password" v-model="data.password">
      <label for="password">Password-Confirm</label>
      <input type="password" v-model="data.password_confirm">

      <input type="submit" value="sign-up">
    </form>
</template>


<script setup>

import { useStore } from 'vuex';
import { reactive } from 'vue';
import FetchApi from '../utils/FetchApi';

const store = useStore()

const data = reactive({
  name: '',
  password: '',
  password_confirm: '',
})
  
function sign_up() {
  FetchApi('/api/users/sign-up', 'POST', data)
    .then(res => {
      //  store.commit('alert', res)
    })
}
</script>

<style lang="scss">
  
</style>
