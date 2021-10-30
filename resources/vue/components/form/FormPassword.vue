<template>
  <div class="form-password">
    <form-input :value="value" :type="data.type" :label="label" :placeholder="placeholder" @update:value="$emit('update:value', $event)">
    </form-input>
      <font-awesome class="form-password-icon" type="far" cursor="pointer" :icon="data.icon" @click="show_or_hide_password"></font-awesome>
  </div>
</template>


<script setup>
import { reactive } from 'vue';
import FontAwesome from '../FontAwesome.vue';
import FormInput from './FormInput.vue';

defineProps({
  label: String,
  placeholder: String,
  value: String
})

defineEmits(['update:value'])

const data = reactive({
  type: 'password',
  icon: 'eye-slash'
})

function show_or_hide_password() {
  data.type = data.type === 'text' ? 'password' : 'text'
  data.icon = data.icon === 'eye' ? 'eye-slash' : 'eye'
}

</script>

<style scoped>
.form-password {
  position: relative;
  width: 50%;
}

.form-password-icon {
  position: absolute;
  top: 25%;
  right: 1%;
  color: grey;
}
</style>
