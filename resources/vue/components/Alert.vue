<template>
  <div class="alert" :class="store.state.alert.type" v-if="store.state.alert.message">
   <p>{{store.state.alert.message}}</p>
 </div>
</template>


<script setup>

import { useStore } from 'vuex';

const store = useStore()

</script>

<style lang="scss">
  .alert {
    color: white;
    padding: .5rem .3rem;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    animation: showAlert .5s ease .01s;

    &.success {
      background-color: green;
    }
    
    &.error {
      background-color: red;
    }

  }

  @keyframes showAlert {
    0% {
      transform: translateY(-100%)
    }

    100% {
      tansform: translateY(100%);
    }
  }
</style>
