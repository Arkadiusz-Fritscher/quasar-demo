<script setup>
import { useRouter } from "vue-router";
defineProps({
  building: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const handleClick = (id) => {
  router.push({ name: "building", params: { id } });
};
</script>

<template>
  <q-card @click="handleClick(building.id)">
    <q-card-section horizontal>
      <q-card-section class="col-5 flex flex-center">
        <q-img src="https://picsum.photos/400/300.jpg" />
      </q-card-section>

      <q-card-section>
        <div class="text-h5 q-mt-sm q-mb-xs">
          {{ building.attributes.barcode }}
        </div>
        <q-chip outline :clickable="false" size="sm" color="schauloch">{{
          building.attributes.type
        }}</q-chip>

        <div class="text-caption text-grey">
          {{ building.attributes.description }}
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.q-card {
  width: 100%;
  max-width: 360px;
}
</style>
