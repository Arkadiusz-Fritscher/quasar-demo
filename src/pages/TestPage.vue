<script setup>
import BasePageTitle from "src/components/BasePageTitle.vue";
</script>

<template>
  <q-page>
    <BasePageTitle>Bauwerke</BasePageTitle>
    <div class="col-12 text-h3 md-text-h1">Hello</div>
    <div v-for="i in 20" :key="i" class="col-12 col-sm-6 col-md-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus
      voluptatem quae blanditiis, similique cupiditate nisi ea consequatur aut
      id nesciunt doloremque quo facilis a commodi, hic corporis. Atque,
      mollitia?
    </div>
  </q-page>
</template>

<style scoped lang="scss">
// @media (max-width: $breakpoint-sm-max) {
//   .headline-text {
//     color: red;
//   }
// }
</style>
