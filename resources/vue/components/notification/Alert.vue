<template>
  <div class="alert" :class="alert.type" v-if="alert.message">
   <p>{{alert.message}}</p>
   <button class="alert-close" @click="$emit('close')">X</button>
 </div>
</template>


<script setup>

import { onMounted } from 'vue';


const props = defineProps({
  alert: {type: Object, required: true},
  time: {type: Number, default: 1000}
})

let timer = null

const emit = defineEmits(['close'])

// function close() {
//   clearInterval(timer)

//   emit('close')
// }

//FIXME: ajouter un timer pour fermer automatiquement l'alert
// onMounted(() => {
//   timer = setTimeout(() => {
//     emit('close')
//     console.log('IN')
//   }, props.time)
// })

</script>

<style lang="scss" scoped>

  .alert {
    position: relative;
    width: 80%;
    padding: .5rem .3rem;
    // position: fixed;
    // transform: translateY(-100%);
    margin: 5px auto;

    color: white;
    text-align: center;

    cursor: pointer;
    
    animation: showAlert .5s ease .01s;

    &.success {
      background-color: green;
    }
    
    &.error {
      background-color: red;
    }

    &.infos {
      background-color: steelblue;
    }

    &-close {

      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      padding: .5em;
      border: none;

      transform: translateX(50%);

      &:hover {
        background-color: #F25;
        color: white;
      }
    }
  }

  @keyframes showAlert {
    0% {
      transform: translateY(-100%)
    }

    100% {
      tansform: translateY(0%);
    }
  }
</style>
