<script setup>
import TheNavigation from "src/components/navigation/TheNavigation.vue";
import BaseImgCarousel from "src/components/base/BaseImgCarousel.vue";
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <TheNavigation />
    <q-page-container>
      <router-view />
    </q-page-container>

    <Teleport to="body">
      <BaseImgCarousel />
    </Teleport>
  </q-layout>
</template>
