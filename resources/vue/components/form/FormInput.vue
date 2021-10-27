<template>
    <label>{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :value="value"
      @input="$emit('update:value', $event.target.value)"
    />
</template>


<script setup>
/**
 *----
 * Pour les input de type "radio" la proprité value est de type
 * value: {[name]:[value]}
 *----
 */
defineProps({
  type: { type: String, default: 'text' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  required: { default: null },
  value:String,
})

defineEmits(['update:value'])

</script>

<style lang="scss" scoped>
input,
textarea {
  padding: 0.25em;
}
</style>
