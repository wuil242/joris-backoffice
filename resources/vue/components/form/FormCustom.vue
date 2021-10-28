<template>
  <form class="form-custom" @submit.prevent="submit($event, onSubmit)">
    <slot></slot>
  </form>
</template>

<script setup>

const props = defineProps({
  reset: {type:Boolean, default: true},
  onSubmit:Function
})

/**
 * vide tout les champs avant la soumition du formulaire
 * 
 * @param {SubmitEvent} e
 * @param {Function} cb
 */
function submit(e, cb) {
  try {
    cb().then(() => form_reset(e.target))
  }
  catch(error) {
    form_reset(e.target)
  }
}

/**
 * 
 * @param {HTMLFormElement} form
 */
function form_reset(form) {
  if(!props.reset) {
    return
  }

  if(!form_reset_manual(form.elements)) {
    form.reset()
  }
}

/**
 * 
 * @param {HTMLInputElement[]} elements
 */
function form_reset_manual(elements) {
  const inputs = Array.from(elements)
  const inputColors = inputs.filter(input => input.type === 'color')
  if(inputColors.length > 0) {
    inputColors.forEach(inputColor => {
      inputColor.value = '#000000'
    })
    
    inputs.filter(input => !(input.type === 'color' || input.type === 'submit'))
      .forEach(input => input.value = '')
    return true
  }

  return false
}

</script>

<style lang="scss" scoped>
  form {
    --form-bg-color: red;
  }

  .theme-dark form {
    --form-bg-color: blue;
  }

  form {
    background-color: var(--form-bg-color);
  }

</style>
