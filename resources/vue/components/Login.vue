<template>
  <h1>Login</h1>
  <form action="{{ route('post_login')}}" method="post" @submit.prevent="login($event)"> 
    <label for="email">Email</label>
    <input type="email" name="email" id="email">
    <label for="password">Password</label>
    <input type="password" name="password" id="password">
    <button type="submit">login</button>
  </form>
</template>

<script setup>
  function login(ev) {
    console.log(ev)
  }
</script>

<style lang="scss">
  
</style>
