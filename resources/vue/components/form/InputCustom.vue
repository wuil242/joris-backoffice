<template>
  <template v-if="type === 'textarea'">
    <label>{{label}}</label>
    <textarea 
      @keyup="$emit('keyup', value)" 
      :placeholder="placeholder"
      v-model="value"
    ></textarea>
  </template>
  <template v-else>
    <label>{{label}}</label>
    <input 
    :type="type" 
    :placeholder="placeholder" 
    @keyup="$emit('keyup', value)"
    v-model="value"
    />
  </template>
</template>


<script setup>

defineProps({
  type: {type:String, default: 'text'},
  label: {type:String, default: ''},
  placeholder: {type:String, default: ''},
})

defineEmits(['keyup'])

const value = ''
  
</script>

<style lang="scss" scoped>
  input, textarea {
    padding: .25em;
  }
</style>
