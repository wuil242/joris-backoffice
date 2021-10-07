<template>
   <h3>All Users</h3>
     <ul>
       <li v-for="user in data.users" :key="user.name">
       {{user.name}} | {{user.email}}
       <button @click="delete_user(user.id)">X({{user.id}})</button>
       </li>
     </ul>
</template>


<script setup>
import { reactive, onMounted } from 'vue';
import FetchApi from '../utils/FetchApi';

const data = reactive({
  users: []
})

onMounted(() => {
  FetchApi('/api/users').then(res => {
    data.users = res
  })
})


/**
 * @param {number} id
 */

function delete_user(id) {
  FetchApi('/api/users/delete', 'DELETE', {id})
  .then(res => {
    data.users.filter(user => user.id !== id)
    data.res = res
    // store.commit('alert', res)
  })
}
  
</script>

<style lang="scss">
  
</style>
