<template>
  <form class="form-custom" @submit.prevent="submit">
    <slot />
  </form>
</template>


<script setup>

const emit = defineEmits(['submit'])
  
/**
 * vide tout les champs non vide avant la soumition du formulaire
 * 
 * @param {SubmitEvent} e
 */
function submit(e) {
  const fields = Array.from(e.target.children)
  const inputs = fields.filter(field => (field.nodeName === 'INPUT' || field.nodeName === 'TEXTAREA') && field.value !== '')
  inputs.forEach((input, index) => {
    input.value = ''
    if(inputs.length - 1 === index) {
      emit('submit')
    }
  })
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
