<script setup>
import { useFiles } from "src/stores/files.js";
import { computed, onUpdated, ref, watch } from "vue";
import { api } from "boot/axios";
import TheBuildingDetail from "../buildings/TheBuildingDetail.vue";

const fileStore = useFiles();
const building = ref({});
const isLoading = ref(false);

const loadSelectedBuilding = async () => {
  if (fileStore.showSidecard) {
    fetchBuilding(fileStore.sidecardBuilding);
  } else {
    fileStore.sidecardBuilding = "";
    building.value = {};
  }
};

const fetchBuilding = async (barcode) => {
  try {
    isLoading.value = true;
    const options = {
      params: {
        "filters[barcode][$eq]": `${barcode}`,
        populate: "*",
      },
    };
    const { data } = await api.get("/api/objects", options);
    building.value = data.data[0];
    isLoading.value = false;
  } catch (err) {
    console.log(err.message);
  }
};

watch(
  () => fileStore.sidecardBuilding,
  (value, prev) => {
    if (value) {
      loadSelectedBuilding(value);
    }
  }
);
</script>

<template>
  <q-drawer
    :width="500"
    elevated
    behavior="desktop"
    v-model="fileStore.showSidecard"
    :persistent="false"
  >
    <TheBuildingDetail
      v-if="Object.keys(building).length && fileStore.showSidecard"
      :building="building"
    />
  </q-drawer>
</template>

<style scoped></style>
