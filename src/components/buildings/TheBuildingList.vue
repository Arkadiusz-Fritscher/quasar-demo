<script setup>
import useStore from "src/composables/store";
import BuildingCard from "./BuildingCard.vue";
import { api } from "boot/axios";
import { onMounted } from "vue";
const { store } = useStore();

defineProps({
  filter: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <section>
    <BuildingCard
      v-for="building in store.buildings"
      :key="building.barcode"
      :building="building"
    />
  </section>
</template>

<style scoped></style>
