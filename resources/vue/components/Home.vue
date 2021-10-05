<template>
  <div>
      {{store.state.count}}
    <h1>Home</h1>
    <button @click="store.state.count++">++</button>
    
  </div>
</template>

<script lang="ts" setup>

import { inject } from "vue";



const store = inject('store')

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