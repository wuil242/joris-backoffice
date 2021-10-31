<template>
  <button class="form-submit" type="submit" :class="{'is-loading': loading}">
    <slot></slot>
  </button>  
</template>


<script setup>

defineProps({
  value:String,
  loading: {type:Boolean, default: false}
})

</script>

<style scoped>
  .form-submit {
    position: relative;
    padding: .9em 2em .8em 2em;

    background-color: var(--form-submit-bg);

    border: none;
    border-radius: 8px;

    color: var(--form-submit);
    text-align: center;
    font-size: .9rem;
    font-weight: bold;
    line-height: 20px;
    letter-spacing: 0.2px;

    cursor: pointer;
    
  }

  .form-submit::after {
    content: '';
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1em;
    height: 1em;

    border-radius: 50%;
    
    background-color:  var(--form-submit-bg);

    border-top: solid .25em var(--form-submit);
    border-bottom: solid .25em transparent;
    border-right: solid .25em transparent;
    border-left: solid .25em transparent;

    transform: translate(-50%, -50%) rotate(0);

  }

  .is-loading.form-submit {
    color: transparent;
  }
  .is-loading.form-submit::after {
    display: block;
    animation: rotation 1s infinite linear;
  }

  @keyframes rotation {
    0% {
      transform: translate(-50%, -50%) rotate(0);
    }

    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

</style>
