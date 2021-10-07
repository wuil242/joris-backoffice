<template>
  <div class="location-layout">
    <slot/>
    <form @submit.prevent="$emit('add', data.name); data.name = ''">
      <label for="name">{{label}}</label>
      <input type="text" v-model="data.name">

      <input type="submit" :value="submitMessage">
    </form>
    <!-- <slot name="location-title"></slot> -->
    <ul v-if="locations.elements.length > 0">
      <li v-for="location in locations.elements" 
        :key="location.id" 
        :class="{active: locations.current === location.id}"
        @click.prevent="$emit('select', location.id)"
      >
        <a href="#" :title="location.name" >{{location.name}}</a>
        <button @click="$emit('delete', location.id)">Sup</button>
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
  locations: {type: Object, required: true},
  borderColor: {type: String, required: true}
})

defineEmits(['add', 'select', 'delete'])


const data = reactive({
  name: '',
  res: null,
})
  
</script>

<style lang="scss" scoped>
  .location-layout {
    border: 2px solid v-bind(borderColor);
    padding: 1rem;

    input {
      margin: .5rem 0;
      padding: .3rem .7rem;
    }

    li {
      display: flex;
      justify-content: space-between;
      // gap: 5px;
      padding: .25rem;
      cursor: pointer;
    }

    li:hover {
      background-color: #CCC;
    }

    .active {
      background-color: lawngreen;
    }
  }
</style>
