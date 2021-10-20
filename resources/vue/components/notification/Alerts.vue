<template>
<div class="alerts" v-if="alerts.length > 0">
  <button class="alerts-close" @click="$emit('closeAll')">Close All</button>
  <alert-vue 
    v-for="alert in alerts" 
    :key="alert.id"
    :alert="alert"
    @close="$emit('closeOne', alert.id)"
  ></alert-vue>
</div>
</template>


<script setup>
import AlertVue from './Alert.vue';

defineProps({
  alerts: {type: Array, required: true}
})

defineEmits(['closeOne', 'closeAll'])

</script>

<style lang="scss" scoped>
  .alerts {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    background-color: grey;
    width: 25%;
    

    &-close {
      display: block;
      // position: absolute;
      // top: 0;
      // right: 0;
      // bottom: 0;
      padding: .5em;
      border: none;

      cursor: pointer;

      &:hover {
        background-color: #F25;
        color: white;
      }
    }
  }


  
</style>
