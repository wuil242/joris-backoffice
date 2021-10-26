<template>
 <label>{{label}}</label>
 <select @change="$emit('change', inputValue)" v-model="inputValue">
    <option 
    v-if="optionDefault" 
    :value="optionDefault[keyValue]"
    >{{ optionDefault[keyOption] }}</option>
    <option
      v-for="option in options"
      :key="option[keyOption]"
      :value="option[keyValue]"
    >{{ option[keyOption] }}</option>
  </select>
</template>


<script setup>

import {onBeforeUpdate, ref} from 'vue'

const props = defineProps({
  optionDefault: { type: Object, default: null },
  keyOption: { type: String, required: true },
  keyValue: { type: String, required: true },
  options: { type: Array, required: true },
  label:String
})

defineEmits(['change'])

const inputValue = ref('')

onBeforeUpdate(() => {
  if(props.options.length > 0 && inputValue.value === '') {
    inputValue.value = props.optionDefault !== null ? props.optionDefault[props.keyValue] : props.options[0][props.keyValue]
  }
})

</script>

<style scoped>
  label {
    display: block;
  }
</style>
