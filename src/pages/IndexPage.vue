<script>
import { useStore } from "src/stores/store";
import { ref } from "vue";
import BasePageTitle from "src/components/BasePageTitle.vue";
import TheBuildingList from "src/components/buildings/TheBuildingList.vue";

export default {
  async preFetch({ store }) {
    const $store = useStore(store);
    if (!$store.buildings.length) {
      $store.initialBuildingFetch();
    }
  },

  components: {
    BasePageTitle,
    TheBuildingList,
  },

  setup() {
    const store = useStore();
    const selectedBuildingType = ref();

    return { selectedBuildingType, store };
  },
};
</script>

<template>
  <q-page padding>
    <BasePageTitle>Bauwerke</BasePageTitle>

    <!-- Building type selection -->
    <div class="row q-mb-md">
      <q-select
        :options="store.buildingTypes"
        v-model="selectedBuildingType"
        outlined
        label="Bauwerk Art"
        clearable
        dense
        :class="[
          { 'col-12': $q.screen.lt.md },
          { 'col-4': $q.screen.md },
          { 'col-2': $q.screen.gt.md },
        ]"
      />
    </div>

    <!-- The Building List -->
    <TheBuildingList :filter="selectedBuildingType" />
  </q-page>
</template>

<style scoped lang="scss">
// @media (max-width: $breakpoint-sm-max) {
//   .headline-text {
//     color: red;
//   }
// }
</style>
