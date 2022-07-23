<script>
import { useStore } from "src/stores/store";
import { api } from "boot/axios";
import { ref } from "vue";
import BasePageTitle from "src/components/BasePageTitle.vue";
import TheBuildingList from "src/components/buildings/TheBuildingList.vue";

export default {
  async preFetch({ store }) {
    const $store = useStore(store);

    try {
      const { data } = await api.get("/api/objects");
      $store.buildings = data.data;
      $store.meta = data.meta;
    } catch (err) {
      console.log(err);
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
    <div class="row">
      <q-select
        :options="store.buildingTypes"
        v-model="selectedBuildingType"
        outlined
        label="Bauwerk Art"
        clearable
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
