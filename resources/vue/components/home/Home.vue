<template>
  <div class="home">
    <aside class="home-sidebar">
      <h1>Joris <span>Backoffice</span></h1>
      <home-profil></home-profil>
      <home-menu></home-menu>
      <logout-button class="button home-sidebar-logout"></logout-button>
    </aside>
    <section class="home-main">
      <pre>{{$store.state}}</pre>
      <router-view></router-view>
    </section>
  </div>
</template>

<script setup>

import DarkModeButton from '../DarkModeButton.vue'
import HomeMenu from './HomeMenu.vue';
import LogoutButton from '../LogoutButton.vue';
import HomeProfil from './HomeProfil.vue'

</script>


<style lang="scss" scoped>
  .home {
    display: grid;
    position: relative;
    grid-template-columns: 180px 1fr;
    // grid-template-rows: 10vh auto;
    grid-template-areas: "sidebar main";

    background-color: white;

    &-header {
      grid-area: header;
    }

    &-sidebar {
      position: sticky;
      top: 0;
      left: 0;
      height: 100vh;
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 10fr 20fr 60fr 15fr;
      grid-area: sidebar;

      background-color: var(--home-sidebar, #363740);

      color: white;
    }

    &-sidebar-logout {
      // margin-top: 1rem;

      place-self: center;
      // flex: none;
      // grid: none;

      &:hover {
        background-color: rgb(151, 12, 12);
      }

      &:focus {
        box-shadow: 0 0 2px 4px black;
      }
    }

     &-main {
      padding: 1rem;
      grid-area: main;
      color: var(--home-text-color);
    }

    .router-link-active {
      // color: rgb(102, 54, 8);
      color: rgb(5, 177, 125);
      
    }
    .router-link-exact-active {
      color: rgb(177, 31, 5);
    }

  }

</style>