<template>
  <form class="form-custom">
    <slot />
  </form>
</template>


<script setup>

  
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
