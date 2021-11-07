<template>
  <div class="form-textarea" reset>
    <label>{{ label }}</label>
    <textarea
      :placeholder="placeholder"
      :required="required"
      :value="value"
      @input="$emit('update:value', $event.target.value)"
    ></textarea>
    <form-errors :messages="errors" :color="errorsColor"></form-errors>
  </div>
</template>

<script setup>
import FormErrors from './FormErrors.vue'

/**
 *----
 * Pour les textarea de type "radio" la proprité value est de type
 * value: {[name]:[value]}
 *----
 */
defineProps({
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  required: { default: null },
  value:String,
  errors: Array,
  errorsColor: {type:String, default: '#F32727'}
})

defineEmits(['update:value'])

</script>

<style lang="scss" scoped>

.form-textarea {
  text-align: start;
  width: 100%;
}

.form-textarea label, .form-textarea textarea{
  display: block;
}

.form-textarea label {
  
  color: var(--form-label, #9FA2B4);
  text-transform: capitalize;
}

.form-textarea textarea {
  width: 100%;
  min-height: 90px;
  margin-top: 6px;
  padding: .5em .69em;

  background-color: var(--form-input-bg, #FCFDFE);

  border: solid 1px var(--form-input-border, #F0F1F7);
  border-radius: 8px;
  
  color: var(--form-input, #4B506D);
}


.form-textarea textarea::placeholder {
  color: var(--form-input, #4B506D);
  padding: .7em .5em;
}

.form-textarea textarea:focus {
  /* color: var(--form-input, #4B506D); */
  outline: none;
  box-shadow: 0px 0px 2px 1px var(--form-input, #4B506D);
}


.form-textarea textarea:disabled {
  /* color: var(--form-input, #4B506D); */
  background-color: var(--form-disabled, #9FA2B4);
}
</style>
