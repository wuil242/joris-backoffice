<template>
  <div class="home-loader" ref="loader">
    <span></span>
    <span></span>
  </div>
</template>


<script setup>

</script>

<style scoped>
  .home-loader {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;

    
    
   background-color: #4b506daf; 
    
    z-index: var(--layer-top);
    /* overflow: hidden; */
  }

  .home-loader span {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 90px;
    height: 90px;


    background-color: transparent;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #FFFFFF;
    border-left: 10px solid #FFFFFF;

    background-color: transparent;
    transform: translate(-50%, -50%) rotate(0deg);
    animation: home-loader-rotate 2.5s linear infinite;
    border-radius: 50%;
  }

  .home-loader span:last-of-type {
    width: 45px;
    height: 45px;
    border-top: 5px solid #FFFFFF;
    border-bottom: 5px solid #FFFFFF;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    animation: home-loader-rotate 1.5s linear reverse infinite;
  }

  @keyframes home-loader-rotate {
    0% {
    transform: translate(-50%, -50%) rotate(0deg);
    }

    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
  }
</style>
