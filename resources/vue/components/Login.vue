<template>
  <main class="login">
    <form-custom class="login-form" @submit="login">
      <img class="login-logo" src="../../images/default.jpeg" />
      <h1 class="login-subtitle">Joris-Admin</h1>
      <h2 class="login-title">Connexion</h2>
      <small class="login-small">
        Entrer votre email et votre mot de passe en dessous
      </small>
      <form-input class="login-input" label="Email" placeholder="example@email.cg" v-model:value="data.email"></form-input>
      <form-password label="password" v-model:value='data.password'></form-password>
    </form-custom>

  </main>
</template>

<script setup>
  import {reactive, ref, onMounted} from 'vue'
  import {useStore} from 'vuex'
  import FetchApi from '../utils/FetchApi';
  import FormCustom from './form/FormCustom.vue'
  import FormInput from './form/FormInput.vue'
  import FormPassword from './form/FormPassword.vue'

  const loading = ref(false)

  const data = reactive({
    email: '',
    password: ''
  }) 

  function login() {
    console.log('LOGIN')
  }
</script>


<style scoped>
.login {

  background-color: var(--login-bg, #363740);
  color: var(--login-color, #A4A6B3);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.login-form {
  width: 50vw;
  /* height: 50vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
}

.login-logo {
  width: 48px;
  height: 48px;
  margin-top: 40px;
  
  border-radius: 50%;
  
  object-fit: cover;
}

.login-title {
  font-size: 2rem;
  color: var(--login-title, #252733);
  font-weight: bold;
  margin-top: 32px;
}

.login-subtitle {
  font-size: 1.5rem;
  font-weight: bold;
}

.login-small {
  color: var(--login-small, #9FA2B4);
  font-size: .9rem;
  font-weight: lighter;
  margin-top: 12px;

}


</style>
