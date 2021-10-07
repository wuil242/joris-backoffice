<template>
 
  <div>
    {{ store.state }}
  </div>
  <h1>Login</h1>
  <form @submit.prevent="login" >
    <label for="email">Email</label>
    <input type="email" name="email" v-model="data.email" :disabled="data.loading">
    <span class="errors">{{data.errors.email}}</span>
    <label for="password">Password</label>
    <input type="password" name="password" v-model="data.password" :disabled="data.loading">
    <span class="errors">{{data.errors.password}}</span>
    
    <input type="submit" value="login">
  </form>
</template>

<script setup>
  import {reactive} from 'vue'
  import {useStore} from 'vuex'
  import FetchApi from '../utils/FetchApi';

  const store = useStore()

  const data = reactive({
    email: 'admin@admin.com', 
    password: 'admin', 
    errors:{email: '', password: ''},
    loading: false,
  })

  function login() {
    data.loading = true
    for (const key in data.errors) {
      data.errors[key] = ''
    }
    FetchApi('/api/users/login', 'POST', {
      email: data.email,
      password: data.password
    }).then(res => {

     if(res.errors) {
       if(!res.errors[0].field) {
        //  store.commit('alert', {
        //    type: 'error',
        //    message: res.errors[0].message
        //  })
         data.loading = false
         return
       }

       res.errors.forEach(({field, message}) => {
         data.errors[field] = message
      })

      data.loading = false
      return
     }

     
      store.commit('login', res.user)
      // store.commit('alert', {
      //   type: res.type,
      //   message: res.message
      // })
     data.loading = false
     
    })
  }
</script>


<style lang="scss">
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .errors {
      color: red;
    }
  }


</style>
