<script setup>
import { onMounted, ref, unref, watch } from "vue";
import { useStore } from "src/stores/store";
import { useRoute } from "vue-router";
import { api } from "boot/axios";

const store = useStore();
const route = useRoute();
const currentBuildingValues = ref();
const isLoading = ref(false);

onMounted(() => {
  setActiveBuildingValues();
});

watch(route, (to, from) => {
  setActiveBuildingValues();
});

const setActiveBuildingValues = () => {
  const { barcode, location, type, description } = unref(
    store.currentBuilding.attributes
  );
  currentBuildingValues.value = { barcode, location, type, description };
};

const handleSave = () => {
  const changesVales = changedBuildingValues();
  if (changesVales) {
    updateBuildingValues(changesVales);
  }
};

const changedBuildingValues = () => {
  const changesVales = {};
  for (const [key, value] of Object.entries(currentBuildingValues.value)) {
    if (
      store.currentBuilding.attributes[key] !== currentBuildingValues.value[key]
    ) {
      changesVales[key] = value;
    }
  }
  return Object.entries(changesVales).length ? changesVales : false;
};

const updateBuildingValues = async (newValues) => {
  try {
    isLoading.value = true;
    await api.put(`/api/objects/${route.params.id}`, {
      data: newValues,
    });

    isLoading.value = false;
    window.location.reload();
  } catch (err) {
    console.log(err.message);
  }
};
</script>

<template>
  <q-dialog persistent>
    <q-card>
      <q-card-section class="column q-gutter-md">
        <q-input
          label="Barcode"
          stack-label
          filled
          dense
          v-model="currentBuildingValues.barcode"
        />

        <q-input
          label="Adresse"
          stack-label
          filled
          v-model="currentBuildingValues.location"
          dense
          class="col"
        />

        <q-select
          label="Art"
          stack-label
          filled
          v-model="currentBuildingValues.type"
          :options="['Armaturenschacht', 'Schauloch']"
          dense
          class="col"
        />

        <q-input
          label="Bemerkung"
          stack-label
          filled
          autogrow
          v-model="currentBuildingValues.description"
          dense
          class="col"
        />
      </q-card-section>

      <q-card-actions align="around">
        <q-btn
          flat
          label="Abbrechen"
          color="primary"
          class="col"
          v-close-popup
        />
        <q-btn
          icon="mdi-content-save"
          label="Speichern"
          color="primary"
          unelevated
          :loading="isLoading"
          v-close-popup="!isLoading"
          @click="handleSave"
          class="col"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.q-card {
  width: 100%;
  max-width: 560px;
}
</style>
