<template>
  <form @submit.prevent="submit">
      <div v-for="field in fields" :key="field.name">
        <label for="field.name">{{field.label}}</label>
        <template v-if="field.type === 'textarea'">
          <textarea :name="field.name" :id="field.name" :placeholder="field.placeholder"></textarea>
        </template>
        <template v-else-if="field.type === 'radio'" 
          v-for="element in field.elements"
          :key="element.value"
        >
          <label 
           
            :for="field.name + element.value"
          >
            {{element.label}}
          </label>
            <input 
            :type="field.type || 'text'"
            :name="field.name" 
            :id="field.name + element.value"
            :value="element.value || ''"
            :disabled="field.disabled"
            :placeholder="field.placeholder || ''"
            :selected="true"
            v-model="field.value"
          />
        </template>
        <template v-else-if="field.type === 'select'">
          <select :name="field.name" :id="field.name">
            <option v-if="field.default" :value="field.default.value">{{field.default.option}}</option>
            <option 
              v-for="element in field.elements"  
              :key="element.value"
              :value="element.value">
                {{element.option}}
            </option>
          </select>
        </template>
        <template v-else>
          <input 
            :type="field.type || 'text'" 
            :name="field.name" 
            :id="field.name" 
            :value="field.value || ''"
            :disabled="field.disabled || false"
            :placeholder="field.placeholder || ''"
            v-model="field.value"
          >
        </template>
        <p style="color: red;" :style="{opacity: field.error !== '' ? '1' : '0'}">{{field.error || ''}}</p>
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
 * * if type === 'radio'
 * * elements = {label:string, value: string, default:boolean}
 * 
 * * else if type === 'select'
 * * element = {option: string, value: string|number}
 * * default? = {option: string, value: string|number}
 * 
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
