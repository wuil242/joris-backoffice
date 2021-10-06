<template>
  <div>
    <h1>Home</h1>
    <div>{{store.state}}</div>
    <button v-if="store.state" @click="logout">Logout</button>
     <h2>Add User</h2>
     <h3>All Users</h3>
     <ul>
       <li v-for="user in data.users" :key="user.name">
       {{user.name}} | {{user.email}}
       <button @click="delete_user(user.id)">X({{user.id}})</button>
       </li>
     </ul>
     <div>{{ data.res }}</div>
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
  </div>
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
  res: null,
  users: []
})

FetchApi('/api/user').then(res => {
  data.users = res
})

function sign_up() {
  FetchApi('/api/user/sign-up', 'POST', data)
    .then(res => {
      data.res = res
    })
}

function logout() {
  FetchApi('/api/user/logout', 'POST', {}).then(res => {
      store.commit('alert', {
        type: res.type,
        message: res.message
      })
      store.commit('logout')
  })
}

/**
 * @param {number} id
 */
function delete_user(id) {
  FetchApi('/api/user/delete', 'POST', {id})
  .then(res => {
    data.users.filter(user => user.id !== id)
    data.res = res
    store.commit('alert', res)
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