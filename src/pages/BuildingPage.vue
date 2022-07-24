<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div>
    building page
    {{ route }}
  </div>
</template>

<style scoped></style>
