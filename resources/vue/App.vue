<template>
<div>

      <h1>HomePage</h1>
      <div>STORE COUNT = {{store.state}}</div>
      <p>
        <!-- use the router-link component for navigation. -->
        <!-- specify the link by passing the `to` prop. -->
        <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
          <router-link to="/">Go to Home</router-link>
          <router-link to="/test">Go to Test</router-link>
        </p>
        <!-- route outlet -->
        <!-- component matched by the route will render here -->
        <router-view></router-view>
</div>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import { useStore } from 'vuex'


const store = useStore()

provide('store', store)


</script>


