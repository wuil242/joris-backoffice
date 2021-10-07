<template>
<div class="alerts" v-if="alerts.size > 0">
  <button class="alerts-close" @click="close">Close All</button>
  <alert-vue 
    v-for="alert in alerts.values()" 
    :key="alert.timer || alert.type"
    :alert="alert"
    @close="$emit('closeOne', [$event])"
  ></alert-vue>
</div>
</template>


<script setup>
import AlertVue from './Alert.vue';

const props = defineProps({
  alerts: {type: Map, required: true}
})

const emit = defineEmits(['closeOne', 'closeAll'])

function close() {
  const tab = []
  for (const key of props.alerts.keys()) {
    tab.push(key)
  }
  emit('closeAll', tab)
}

</script>

<style lang="scss" scoped>
  .alerts {
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    position: fixed;
    top: 0;
    left: 50%;
    gap: 5px;
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
