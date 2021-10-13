<template>
  <form @submit.prevent="submit">
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
        <p style="color: red;" :style="{opacity: field.error !== '' ? '1' : '0'}">{{field.error || 'no error'}}</p>
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
const {fields} = defineProps({
  fields: {type: Object, required: true}
})

const emit = defineEmits(['submition'])

function submit() {
  for (const field in fields) {
    fields[field].error = ''
  }

  emit('submition')
}
  
</script>

<style lang="scss" scoped>
  form {
    // display: flex;
    // flex-direction: column;
    // align-items: flex-start;
    padding: .25rem;
    gap: 5px;

    label, input {
      display: block;
    }

    input {
      padding: .5rem;
    }
  }

</style>
