<template>
  <div class="home">
    <header class="home-header">
      <button v-if="!store.state.user" @click="logout" class="button home-header-logout">Logout</button>
      <router-link to="/profil">
        <img src="#" alt="photo de profil" class="home-header-image">
      </router-link>
      <nav>
        <ul>
          <li><router-link to="/">Acceuil</router-link></li>
          <li><router-link to="/admin">Page Admin</router-link></li>
          <li><router-link to="/prestataire">Prestataire</router-link></li>
          <li><router-link to="/location">Locations</router-link></li>
        </ul>
      </nav>
    </header>
    <section class="home-main">
      <!-- <div>{{store.state}}</div> -->
      <router-view></router-view>
    </section>
  </div>
</template>

<script setup>

import { useStore } from 'vuex';
import FetchApi from '../utils/FetchApi';

const store = useStore()

function logout() {
  FetchApi('/api/users/logout', 'POST', {}).then(res => {
      // store.commit('alert', {
      //   type: res.type,
      //   message: res.message
      // })
      store.commit('logout')
  })
}

</script>


<style lang="scss" scoped>
  .home {
    display: grid;
    position: relative;
    grid-template-columns: 10fr 90fr;

    &-header {
      position: sticky;
      top: 0;
      left: 0;
      background-color: #DDD;
      display: flex;
      flex-direction: column;
      height: 100vh;
      resize: horizontal;
      justify-content: flex-start;
      align-items: center;
      // padding: 1rem 0;
      gap: 1rem;

      &:last-child {
        margin-bottom: 1rem;
      }

    }

    &-header-logout {
      margin-top: 1rem;
      padding: .4em .7em;
      cursor: pointer;
      background-color: rgb(243, 39, 39);
      color: white;
      border: none;
      box-shadow: 0 0 1px 0 black;
      border-radius: 4px;

      &:hover {
        background-color: rgb(151, 12, 12);
      }

      &:focus {
        box-shadow: 0 0 2px 4px black;
      }
    }

    &-header-image {
      width: 50%;
      height: auto;
      background-color: gray;
      object-fit: cover;
      border-radius: 50%;
      display: block;
      text-align: center;
      margin: auto;
    }

     &-main {
      padding: 1rem;
    }
  }
</style>