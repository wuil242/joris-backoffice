<template>
  
      {{store.state.count}}
    <h1>Test</h1>
    <button @click="store.state.count++">++</button>
    
</template>

<script setup lang="ts">
import { inject } from "vue";
import { Store } from "vuex";


const store = inject('store') as Store<any>
</script>