<template>
  <form class="form-custom" @submit.prevent="submit">
    <slot></slot>
  </form>
</template>


<script setup>

const emit = defineEmits(['submit'])

/**
 * vide tout les champs avant la soumition du formulaire
 * 
 * @param {SubmitEvent} e
 */
function submit(e) {
  /**
   * @type {HTMLInputElement[]}
   */
  const inputs = Array.from(e.target.elements)
  inputs.forEach(input => {
    if(input.type !== 'color' && input.type !== 'submit') {
      input.value = ''
    }
  })
  emit('submit')
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
