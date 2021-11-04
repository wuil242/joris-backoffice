<template>
  <div class="home-profil">
    <img  class="home-profil-image" src="../../../images/default.jpeg" alt="photo de profil" />
    <router-link class="home-profil-link" to="/profil" >Profil</router-link>
  </div>
</template>


<script setup>


</script>

<style scoped>

.home-profil {
  width: 100%;
  height: 100%; 
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.home-profil-image {
  background-color: gray;
  display: block;
  width: 90px;
  height: 90px;
  object-fit: cover;

  border-radius: 50%;
}

.home-profil-image img {
  /* position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  object-fit: cover;
  text-align: center;
  width: 80%;
  height: 80%;
  margin: auto;

  transform: translate(-50%, -50%); */
}
</style>
