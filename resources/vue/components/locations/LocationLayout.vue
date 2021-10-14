<template>
  <div class="location-layout">
    <!-- <slot/> -->
    <form @submit.prevent="$emit('add', data.name); data.name = ''" class="location-layout-form">
      <label for="name">{{label}}</label>
      <input type="text" v-model="data.name">
       <template v-for="error in errors">
          <p style="color: red;">{{error.message}}</p>
      </template>
      <input type="submit" :value="submitMessage">
    </form>
    <div v-if="locations.pagination ? locations.pagination.length > 1 : false">
      <template v-for="pagination in locations.pagination" :key="pagination.page">
          <button 
            :href="pagination.url" 
            :class="{active:pagination.isActive}"
            @click.prevent=" pagination.isActive || $emit('pageChange', pagination.page)"
          >
          {{pagination.page}}</button>
      </template>
    </div>
    <!-- <slot name="location-title"></slot> -->
    <ul v-if="locations.elements.length > 0">
      <li v-for="location in locations.elements" 
        :key="location.id" 
        :class="{active: current === location.id}"
        @click.prevent="$emit('select', location.id)"
      >
        <a href="#" :title="location.name" >{{location.name}}</a>
        <button @click="$emit('delete', location.id)">Sup</button>
      </li>
    </ul>
  </div>
</template>


<script setup>
import {reactive} from 'vue'

defineProps({
  label: {type: String, required: true},
  submitMessage: {type: String, required: true},
  locations: {type: Object, required: true},
  borderColor: {type: String, required: true},
  current: {type:Number, default: 0},
  errors: {type: Array, default: []}
})

defineEmits(['add', 'select', 'delete', 'pageChange'])


const data = reactive({
  name: '',
  res: null,
})
  
</script>

<style lang="scss" scoped>

button {
  padding: .25rem;
}
  .location-layout {
    border: 2px solid v-bind(borderColor);
    // padding: 1rem;
    height: 90vh;
    position: relative;

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

    &-form {
      position: sticky;
      top: 0;
      right: 0;
      left: 0;
      margin: 0;
      background-color: #BBB;
    }
  }
</style>
