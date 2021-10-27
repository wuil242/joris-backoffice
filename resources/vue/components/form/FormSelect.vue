<template>
  <div>
  <label>{{label}}</label>
  <select @input="$emit('update:value', $event.target.value)">
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
  </div>
</template>


<script setup>

import {onBeforeUpdate, ref} from 'vue'

const props = defineProps({
  optionDefault: { type: Object, default: null },
  keyOption: { type: String, default: 'option' },
  keyValue: { type: String, default: 'value' },
  options: { type: Array, required: true },
  label:String,
  value: [String, Number]
})

defineEmits(['update:value'])

</script>

<style scoped>
  label {
    display: block;
  }
</style>
