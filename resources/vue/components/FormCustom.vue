<template>
  <form @submit.prevent="$emit('submition')">
      <div v-for="field in fields" :key="field.name">
        <label for="field.name">{{field.label}}</label>
        <input 
        :type="field.type" 
        :name="field.name" 
        :id="field.name" 
        :value="field.value"
        :disabled="field.disabled"
        v-model="field.value"
        >
        <p style="color: red;">{{field.error}}</p>
      </div>
      <slot></slot>
  </form>
</template>


<script setup>

/**
 * @property {name:{
 * name:string,
 * type:string,
 * value:string|number,
 * disabled:boolean,
 * }} fields
 */
defineProps({
  fields: {type: Object, required: true}
})

defineEmits(['submition'])
  
</script>

<style lang="scss" scoped>
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: .25rem;
    gap: 5px;
  }

  form input {
    padding: .5rem;
    display: block;
  }
</style>
