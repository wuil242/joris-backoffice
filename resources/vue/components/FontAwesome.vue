<template>
  <i class="icon" :class="type + ' fa-' + icon"></i>
</template>


<script setup>
defineProps({
  type: {type:String, default: 'fa'},
  color: {type:String, default: 'inherit'},
  size: {type:String, default: 'inherit'},
  icon: String,
  cursor:{type:String, default: 'inherit'}
})
  
</script>

<style scoped>
  .icon {
    color: v-bind(color);
    font-size: v-bind(size);
    cursor: v-bind(cursor);
  }
</style>
