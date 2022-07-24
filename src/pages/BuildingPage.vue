<script setup>
import { useRoute } from "vue-router";
import { api } from "boot/axios";
import { onBeforeMount, ref } from "vue";

const route = useRoute();
const isLoading = ref(false);
const building = ref({});
const fetchBuilding = async () => {
  try {
    isLoading.value = true;
    const options = {
      params: { populate: "*" },
    };
    const { data } = await api.get(`/api/objects/${route.params.id}`, options);
    isLoading.value = false;
    return data.data;
  } catch (err) {
    console.log(err.message);
  }
};

onBeforeMount(async () => {
  building.value = await fetchBuilding();
});
</script>

<template>
  <q-page padding>
    <div v-if="!isLoading">
      {{ building }}
    </div>
  </q-page>
</template>

<style scoped></style>
