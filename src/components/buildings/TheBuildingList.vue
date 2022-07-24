<script setup>
import { useStore } from "src/stores/store";
import { computed } from "vue";
import BuildingCard from "./BuildingCard.vue";
const store = useStore();

const props = defineProps({
  filter: {
    type: String,
    default: "",
  },
});

const loadMore = async (index, done) => {
  await store.fetchMoreBuildings();
  done(store.buildings.length === store.meta?.pagination.total);
};

const buildings = computed(() => {
  if (!props.filter) {
    return store.buildings;
  } else {
    return store.buildings.filter(
      (building) =>
        building.attributes.type.toLowerCase() ===
        props.filter.toLocaleLowerCase()
    );
  }
});
</script>

<template>
  <q-page>
    <q-infinite-scroll @load="loadMore" :offset="250">
      <div class="gallery">
        <BuildingCard
          v-for="building in buildings"
          :key="building.barcode"
          :building="building"
        />
      </div>

      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-page>
</template>

<style scoped>
/* .gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, 1fr);
  gap: 24px;
} */

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  grid-template-rows: masonry;
  gap: 1rem;
}
</style>
