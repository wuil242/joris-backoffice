<template>
  <table>
    <slot />
  </table>
</template>


<script setup>

  
</script>

<style lang="scss" scoped>
  table {
    --table-border: black;

    border: solid 4px var(--table-border);
    border-collapse: collapse;
  }

  .theme-dark table {
    --table-border: red;
  }
</style>
