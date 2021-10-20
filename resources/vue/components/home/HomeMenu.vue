<template>
  <nav>
    <template v-for="route in $router.getRoutes()">
      <ul v-if="route.name === 'home'">
        <template v-for="childRoute in route.children">
          <li v-if="childRoute?.name || childRoute?.icon || childRoute?.text">
            <i v-if="childRoute.icon" :class="childRoute.icon"></i>
            <router-link
              :to="childRoute.path"
            >{{ childRoute.text || format_route(childRoute.path) }}</router-link>
            <ul v-if="childRoute.children && childRoute.children.length > 0">
              <template v-for="subRoute in childRoute.children">
                <li v-if="subRoute.path !== ''">
                  <i v-if="subRoute.icon" :class="subRoute.icon"></i>
                  <router-link
                    :to="subRoute.path"
                  >{{ subRoute.text || format_route(subRoute.path) }}</router-link>
                </li>
              </template>
            </ul>
          </li>
        </template>
      </ul>
    </template>
  </nav>
</template>


<script setup>

/**
 * @param {string} path
 */
function format_route(path) {
  const fristLetter = path.replace('/', '')[0]
  return path.replace('/' + fristLetter, fristLetter.toUpperCase())
}

</script>

<style lang="scss" scoped>
  ul {
      list-style-type: disc;
      margin-left: 20px;
    }
</style>
