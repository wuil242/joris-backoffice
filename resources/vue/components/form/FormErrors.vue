<template>
  <div v-if="messages.length > 0">
    <template v-for="message in messages">
        <span class="form-error">{{message}}</span>
    </template>
  </div>
</template>


<script setup>
defineProps({
  messages: Array,
  color: {type: String, default: '#F32727'}
})
  
</script>

<style scoped>
  .form-error {
    color: v-bind(color);
    display: block;
    margin-left: 5%;
  }

</style>
