<template>
 <select @change="$emit('change', value)" v-model="value">
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

import {onMounted} from 'vue'

const props = defineProps({
  optionDefault: { type: Object, default: null },
  keyOption: { type: String, required: true },
  keyValue: { type: String, required: true },
  options: { type: Array, required: true }
})

const emit = defineEmits(['change'])

const value = props?.optionDefault !== null ? props.optionDefault[props.keyValue] : props.options[0][props.keyValue]

onMounted(() => emit('change', value))

</script>

<style lang="scss" scoped>
</style>
