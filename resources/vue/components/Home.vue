<template>
  <div>
    <h1>Home</h1>
    <div>{{store.state}}</div>
    <button v-if="store.state" @click="logout">Logout</button>
  </div>
</template>

<script setup>

import { useStore } from 'vuex';
import FetchApi from '../utils/FetchApi';

const store = useStore()

function logout() {
  FetchApi('/api/user/logout', 'POST', {}).then(res => {
      store.commit('alert', {
        type: res.type,
        message: res.message
      })
      store.commit('logout')
  })
}
</script>


<style lang="scss" scoped>
  a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>