<script setup>
import TheNavigation from "src/components/navigation/TheNavigation.vue";
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <TheNavigation />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
