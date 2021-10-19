<template>
 <h1>Login Page</h1>
 <form-custom @submition="login" :fields="data.fields">
  <input type="submit" value="LOGIN" :disabled="loading">
 </form-custom>
</template>

<script setup>
  import {reactive, ref, onMounted} from 'vue'
  import {useStore} from 'vuex'
  import FetchApi from '../utils/FetchApi';
  import FormCustom from './proto/FormCustom.vue'

  const loading = ref(false)

  const fields = {
    email: {
      label: 'email',
      name: 'email',
      type: 'email',
      value: 'admin@admin.com',
      error: '',
      disabled: loading
    },
    password: {
      label: 'password',
      name: 'password',
      type: 'password',
      value: 'admin',
      error: '',
      disabled: loading
    }
  }

  const store = useStore()

  const data = reactive({
    fields,
  })

  onMounted(() => {
    // login()
  })

  function login() {
    loading.value = true
    
    FetchApi('/users/login', 'POST', {
      email: email.value,
      password: password.value
    })
      .then(res => {
        if(res.typeCode === 1) {
          store.dispatch('login', res.user)
          loading.value = false
        }
        else if(res.typeCode === 0 && res.errors) {
          res.errors.forEach(error => {
            data.fields[error.field].error = error.message
            loading.value = false
          })
        }
        else {
          loading.value = false
        }

      })
  }
</script>


<style lang="scss" scoped>
 input[type=submit] {
   color: red;
   padding: .3em .7em;
   align-self: flex-start;
 }


</style>
