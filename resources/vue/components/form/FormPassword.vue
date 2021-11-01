<template>
  <div class="form-password">
    <router-link :to="forgotLink" class="forgot-link"  v-if="forgotLink !== ''">Mot de passe oublier ?</router-link>
    <form-input :value="value" :type="data.type" :label="label" :placeholder="placeholder" :errors="errors" :errors-color="errorsColor" :disabled="disabled" @update:value="$emit('update:value', $event)">
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
  value: String,
  forgotLink:{type:String, default: ''},
  disabled: {type:Boolean, default: false},
  errors: Array,
  errorsColor: {type:String, default: '#F32727'}
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
  width: 100%;
}

.form-password-icon {
  position: absolute;
  bottom: 15%;
  right: 5%;
  color: var(--form-password-icon, #9FA2B4);
}

.forgot-link {
  position: absolute;
  top: 5%;
  right: 0;

  font-size: .65rem;
  color: var(--form-forgot-link, #9FA2B4);
}
</style>
