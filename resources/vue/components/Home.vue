<template>
  <div class="home">
    <header class="home-header">
      <h1>Joris <br> Backoffice</h1>
      <!-- <div class="home-header-profil"> -->
        <router-link to="/" class="home-header-image">
          <img src="../../images/default.jpeg" alt="photo de profil">
        </router-link>
      <!-- </div> -->
      <nav>
        <ul>
          <li v-for="route in $route.matched[0].children">
            <i v-if="route.icon" :class="route.icon"></i>
            <router-link :to="{name: route.name}">{{route.text || format_route(route.path)}}</router-link>
            <ul v-if="route.children && route.children.length > 0">
              <li v-for="subRoute in route.children">
                <i v-if="subRoute.icon" :class="subRoute.icon"></i>
                <router-link :to="{name: subRoute.name}">{{subRoute.text || format_route(subRoute.path)}}</router-link>
              </li>
            </ul>
          </li>
        </ul>
        <!-- <ul>
          <li><router-link :to="{name: 'stat'}">Statistique</router-link></li>
          <li><router-link :to="{name: 'admin'}">Administration</router-link></li>
          <li><router-link :to="{name: 'service_provider'}">Prestataire</router-link></li>
          <li><router-link :to="{name: 'location'}">Locations</router-link></li>
          <li><router-link :to="{name: 'entreprise'}">Entreprise</router-link></li>
          <li><router-link :to="{name: 'devis'}">Devis</router-link></li>
          <li><router-link :to="{name: 'temoignage'}">Temoignage</router-link></li>
        </ul> -->
      </nav>
      <button @click="logout" class="button home-header-logout">Logout</button>
    </header>
    <section class="home-main">
      <pre>{{store.state}}</pre>
      <router-view></router-view>
    </section>
  </div>
</template>

<script setup>

import { useStore } from 'vuex';
import FetchApi from '../utils/FetchApi';

const store = useStore()

function logout() {
  FetchApi('/users/logout', 'POST')
    .then(res => {
      if(res.typeCode === 1) {
        store.dispatch('logout')
      }
    })
}

/**
 * @param {string} path
 */
function format_route(path) {
  const fristLetter = path.replace('/', '')[0]
  return path.replace('/' + fristLetter, fristLetter.toUpperCase())
}

</script>


<style lang="scss" scoped>
  .home {
    display: grid;
    position: relative;
    grid-template-columns: 180px 1fr;

    &-header {
      position: sticky;
      top: 0;
      left: 0;
      height: 100vh;
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 15fr 25fr 50fr 10fr;
      background-color: #DDD;

    }

    &-header-logout {
      // margin-top: 1rem;
      padding: .4em .7em;
      cursor: pointer;
      background-color: rgb(243, 39, 39);
      color: white;
      border: none;
      box-shadow: 0 0 1px 0 black;
      border-radius: 4px;

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

    &-header-image {
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
    }

    .router-link-active {
      color: rgb(102, 54, 8);
    }

    .router-link-exact-active {
      color: rgb(5, 177, 125);
    }

    ul {
      list-style-type: disc;
      margin-left: 20px;
    }
  }

</style>