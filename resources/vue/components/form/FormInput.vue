<template>
  <div class="form-input">
    <label :for="label">{{ label }}</label>
    <input
      autocomplete="current-password"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :value="value"
      :id="label"
      :disabled="disabled"
      @input="$emit('update:value', $event.target.value)"
    />
    <form-errors :messages="errors" :color="errorsColor"></form-errors>
  </div>
</template>


<script setup>
import FormErrors from './FormErrors.vue';

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
  disabled: {type:Boolean, default: false},
  errors: Array,
  errorsColor: {type:String, default: '#F32727'}
})

defineEmits(['update:value'])

</script>

<style scoped>
.form-input {
  text-align: start;
  width: 100%;
}

.form-input label, .form-input input{
  display: block;
}

.form-input label {
  
  color: var(--form-label, #9FA2B4);
  text-transform: capitalize;
}

.form-input input {
  width: 100%;
  margin-top: 6px;
  padding: .5em .69em;

  background-color: var(--form-input-bg, #FCFDFE);

  border: solid 1px var(--form-input-border, #F0F1F7);
  border-radius: 8px;
  
  color: var(--form-input, #4B506D);
}


.form-input input::placeholder {
  color: var(--form-input, #4B506D);
  padding: .7em .5em;
}

.form-input input:focus {
  /* color: var(--form-input, #4B506D); */
  outline: none;
  box-shadow: 0px 0px 2px 1px var(--form-input, #4B506D);
}


.form-input input:disabled {
  /* color: var(--form-input, #4B506D); */
  background-color: var(--form-disabled, #9FA2B4);
}

</style>
