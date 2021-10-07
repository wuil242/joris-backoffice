<template>
  <div class="profil">
    <h1>Profil</h1>
    <ul>
      <li>Name: {{store.state?.user ? store.state.user.name : 'My Name Admin'}}</li>
      <li>email: {{store.state?.user ? store.state.user.email : 'admin@admin.joris-app'}}</li>
    </ul>
  </div>
</template>


<script setup>
import { useStore } from 'vuex';

const store = useStore()
</script>

<style lang="scss">
  
</style>
