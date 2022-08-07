<script setup>
import TheNavigation from "src/components/navigation/TheNavigation.vue";
import BaseImgCarousel from "src/components/base/BaseImgCarousel.vue";
import TheSidecard from "src/components/sidecard/TheSidecard.vue";
import { useRoute } from "vue-router";
import { useFiles } from "src/stores/files.js";

const fileStore = useFiles();

const route = useRoute();
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <TheNavigation />
    <TheSidecard v-if="route.name === 'sort' && fileStore.files.length" />
    <q-page-container>
      <router-view />
    </q-page-container>

    <Teleport to="body">
      <BaseImgCarousel />
    </Teleport>
  </q-layout>
</template>
