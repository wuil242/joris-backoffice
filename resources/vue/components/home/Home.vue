<template>
  <div class="home">
    <!-- <header class="home-header">
      <h1 class="home-header-title">Page<span>Name</span></h1>
      <dark-mode-button></dark-mode-button>
    </header> -->
    <aside class="home-sidebar">
      <h1>Joris <br> Backoffice</h1>
      <!-- <div class="home-sidebar-profil"> -->
        <router-link to="/profil" class="home-sidebar-image">
          <img src="../../../images/default.jpeg" alt="photo de profil">
        </router-link>
      <!-- </div> -->
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

</script>


<style lang="scss" scoped>

  .home {
    --home-bg-color: white;
    --home-text-color: black;

    --sidebar-bg-color: grey;

    transition: background-color .3s;

  }

  .theme-dark .home {
    --home-bg-color: grey;
    --home-text-color: white!important;


    --sidebar-bg-color: white;
  }

  .home {
    display: grid;
    position: relative;
    grid-template-columns: 180px 1fr;
    // grid-template-rows: 10vh auto;
    grid-template-areas: "sidebar main";

    background-color: var(--home-bg-color);
    color: var(--home-text-color)

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
      grid-template-rows: 15fr 25fr 50fr 10fr;
      grid-area: sidebar;

      background-color: var(--sidebar-bg-color);
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

    &-sidebar-image {
      background-color: gray;
      display: block;
      position: relative;
      
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        object-fit: cover;
        text-align: center;
        width: 80%;
        height: 80%;
        margin: auto;

        transform: translate(-50%, -50%);
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