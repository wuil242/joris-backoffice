<template>
  <main class="login">
    <form-custom class="login-form" @submit="login" :reset="false">
      <img class="login-logo" src="../../images/default.jpeg" />
      <h1 class="login-subtitle">Joris-Admin</h1>
      <h2 class="login-title">Connexion</h2>
      <small class="login-small">
        Entrer votre email et votre mot de passe en dessous
      </small>
      <div class="login-inputs">
        <form-input class="login-input" type="email" label="Email" placeholder="example@email.cg" :disabled="data.loading" v-model:value="data.email" ></form-input>
        <form-errors class="login-error" :messages="['error 1', 'error 2']"></form-errors>
        <form-password class="login-input" forgot-link="/reset/password" label="Mot de passe" placeholder="********" :disabled="data.loading" v-model:value='data.password'></form-password>
        <form-errors class="login-error" :messages="['error 1', 'error 2']"></form-errors>
      </div>
    <form-submit-button class="login-submit" :loading="data.loading">Se connecter</form-submit-button>
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
  import FormSubmitButton from './form/FomSubmitButton.vue'
  import FormErrors from './form/FormErrors.vue';

  const data = reactive({
    email: '',
    password: '',
    loading: false
  }) 

  function login() {
    console.log('LOGIN')
    data.loading = true
    const time = Math.round(Math.random() * 10000) 
    console.log(time)
    setTimeout(() => data.loading = false, Math.max(1000, time))
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
  width: 35vw;
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
.login-inputs {
  margin-top: 24px;
  width: 70%;
}

.login-input {
  margin-top: 24px;
}

.login-error {
  text-align: start;
}

.login-submit {
  width: 70%;
  margin-top: 24px;
}

</style>
