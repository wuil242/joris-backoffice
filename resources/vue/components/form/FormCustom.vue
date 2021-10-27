<template>
  <form class="form-custom" @submit.prevent="submition($event, onSubmit)">
    <slot></slot>
  </form>
</template>


<script setup>

const props = defineProps({
  reset: {type:Boolean, default: true},
  onSubmit:Function
})

/**
 * vide tout les champs avant la soumition du formulaire
 * 
 * @param {SubmitEvent} e
 * @param {Function} cb
 */
function submition(e, cb) {
  /**
   * @type {HTMLInputElement[]}
   */
  // const inputs = Array.from(e.target.elements)
  // inputs.forEach(input => {
  //   if(input.type !== 'color' && input.type !== 'submit') {
  //     input.value = ''
  //   }
  // })
  // emit('submit')
  const isPromise = cb.then !== null

  if(!isPromise) {
    cb()
    if(props.reset) {
     e.target.reset()
    }

    return
  }

  cb().then(() => {
     if(props.reset) {
     e.target.reset()
    }
  })


 
}
</script>

<style lang="scss" scoped>
  form {
    --form-bg-color: red;
  }

  .theme-dark form {
    --form-bg-color: blue;
  }

  form {
    background-color: var(--form-bg-color);
  }

</style>
