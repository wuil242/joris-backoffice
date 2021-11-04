<template>
  <nav>
    <ul class="home-menu-items">
        <template v-for="route in $route.matched[0].children">
          <li class="home-menu-item" v-if="route.text !== undefined && route.text !== null && route.text !== ''">
            <router-link :to="{name: route.name }" class="home-menu-link">
              <font-awesome :icon="route.icon"></font-awesome>
              {{route.text}}
            </router-link>
          </li>       
        </template>
    </ul>
  </nav>
</template>


<script setup>
import FontAwesome from '../FontAwesome.vue';

</script>

<style scoped>
.home-menu-items {
  width: 100%;
  height: 100%;

  list-style-type: none;
}

.home-menu-item {
  width: 100%;
  display: block;
  margin-top: .5em;
}

.home-menu-item .home-menu-link {
  display: inline-block;
  width: 100%;
  padding: .5em;

  text-align: center;
  text-decoration: none;
  color: var(--color-grey, #9FA2B4);
}

.home-menu-link.router-link-active {
  width: 100%;
  background-color: var(--color-grey-dark, #4B506D);
}
</style>
