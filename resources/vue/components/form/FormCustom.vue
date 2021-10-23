<template>
  <form class="form-custom" @submit.prevent="submit">
    <slot></slot>
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
  e.target.reset()
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
