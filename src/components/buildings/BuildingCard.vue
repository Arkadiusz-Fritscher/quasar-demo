<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
  building: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const handleClick = (id) => {
  router.push({ name: "building", params: { id } });
};

const buildingThumbnail = computed(() => {
  return props.building.attributes.thumbnail?.data
    ? props.building.attributes.thumbnail?.data?.attributes?.url
    : "placeholder/noImg@1x.png";
});
</script>

<template>
  <q-card
    bordered
    flat
    @click="handleClick(building.id)"
    class="cursor-pointer"
  >
    <q-card-section horizontal>
      <q-img class="col-5 height-full" :src="buildingThumbnail" />
      <!-- </q-card-section> -->

      <q-card-section class="q-pa-md">
        <div class="text-h5 text-weight-medium">
          {{ building.attributes.barcode }}
        </div>
        <div class="text-caption">{{ building.attributes.location }}</div>
        <q-badge
          :color="building.attributes.type.toLowerCase()"
          :label="building.attributes.type"
          class="q-pa-xs"
          text-color="dark"
        />

        <div
          class="text-body text-grey-8 q-mt-sm ellipsis-3-lines card-description"
        >
          {{ building.attributes.description }}
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.q-card {
  /* width: 100%;
  max-width: 360px;
  max-height: min-content;
  */
  align-self: start;
}

.card-description {
  min-height: 8ch;
}
</style>
