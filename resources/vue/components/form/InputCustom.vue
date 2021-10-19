<template>
  <template v-if="type === 'textarea'">
    <label>{{label}}</label>
    <textarea 
      @keyup="$emit('keyup', value)" 
      :placeholder="placeholder"
      :required="required"
      v-model="value"
    ></textarea>
  </template>
  <template v-else>
    <label>{{label}}</label>
    <input 
    :type="type" 
    :placeholder="placeholder"
    :required="required"
    @keyup="$emit('keyup', value)"
    @change="$emit('change', value)"
    v-model="value"
    />
  </template>
</template>


<script setup>

defineProps({
  type: {type:String, default: 'text'},
  label: {type:String, default: ''},
  placeholder: {type:String, default: ''},
  required: {default: null}
})

defineEmits(['keyup', 'change'])

const value = ''
  
</script>

<style lang="scss" scoped>
  input, textarea {
    padding: .25em;
  }
</style>
