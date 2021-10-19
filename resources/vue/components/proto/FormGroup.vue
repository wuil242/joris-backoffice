<template>
  <fieldset v-for="form in forms">
  <legend>{{form.title}}</legend>
  <form-custom 
    :fields="form.fields"
    @submition="$emit('submit')"
  >
  <slot></slot>
  </form-custom>
  </fieldset>
</template>


<script setup>
import FormCustom from '../proto/FormCustom.vue';

defineProps({
  forms: {type:Array, required: true}
})

defineEmits(['submit'])
  
</script>

<style lang="scss" scoped>
  
</style>
