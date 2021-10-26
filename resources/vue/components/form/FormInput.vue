<template>
  <template v-if="type === 'textarea'">
    <label>{{ label }}</label>
    <textarea
      @keyup="$emit('keyup', input_value)"
      :placeholder="placeholder"
      :required="required"
      v-model="input_value"
    ></textarea>
  </template>
  <template v-else-if="type === 'radio'">
    <p>{{ label }}</p>
    <template v-for="(val, key) in value" :key="val">
      <label :for="key + val">{{ key }}</label>
      <input
        type="radio"
        :name="label"
        :value="val"
        :id="key + val"
        v-model="input_value"
        @change="$emit('change', input_value)"
      />
    </template>
  </template>
  <template v-else>
    <label>{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :required="required"
      @keyup="$emit('keyup', input_value)"
      @change="$emit('change', input_value)"
      v-model="input_value"
    />
  </template>
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
  value: { type: [String, Object], default: '' }
})

defineEmits(['keyup', 'change'])

const input_value = ''

</script>

<style lang="scss" scoped>
input,
textarea {
  padding: 0.25em;
}
</style>
