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
  color: String
})
  
</script>

<style scoped>
  .form-error {
    color: v-bind(color);
    display: block;
    margin-left: 6px;
    margin-top: 2px;

    text-align: start;
  }

</style>
