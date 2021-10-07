<template>
  <div class="location-layout">
    <slot/>
    <form @submit.prevent="$emit('add')">
      <label for="name">{{label}}</label>
      <input type="text" v-model="data.name">

      <input type="submit" :value="submitMessage">
    </form>
    <!-- <slot name="location-title"></slot> -->
    <ul v-if="locations.length > 0">
      <li v-for="location in locations" :key="location.id">
        <a href="#" :title="location.name" @click.prevent="$emit('select', location.id)">{{location.name}}</a>
      </li>
    </ul>
    <div v-else>
      <!-- <slot name="empty-message"></slot> -->
    </div>
  </div>
</template>


<script setup>
import {reactive} from 'vue'

defineProps({
  label: {type: String, required: true},
  submitMessage: {type: String, required: true},
  locations: {type: Array, required: true},
  borderColor: {type: String, required: true}
})

defineEmits(['add', 'select'])


const data = reactive({
  name: '',
  res: null,
})
  
</script>

<style lang="scss" scoped>
  .location-layout {
    border: 1px solid v-bind(borderColor);
    padding: 1rem;

    input {
      margin: .5rem 0;
      padding: .3rem .7rem;
    }
  }
</style>
