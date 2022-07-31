<script setup>
import { ref } from "vue";
import TheSidebar from "src/components/imgSort/TheSidebar.vue";
import GroupCard from "src/components/imgSort/GroupCard.vue";

import { useFiles } from "src/stores/files";
import { useRoute } from "vue-router";
import BaseImgCarousel from "src/components/base/BaseImgCarousel.vue";

const files = useFiles();
const showBuildingList = ref(true);
const route = useRoute();
const showCarousel = ref(false);
</script>

<template>
  <q-page padding>
    <!-- <BaseImgCarousel v-model="showCarousel" :images="fullImages" /> -->
    <TheSidebar v-model="showBuildingList" />

    <div class="gallery">
      <GroupCard
        v-for="group of files.sortedGroups"
        :key="group"
        :group="group"
        :id="group"
      >
      </GroupCard>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 0.75rem;
}

@media (min-width: $breakpoint-sm-min) {
  .gallery {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (min-width: $breakpoint-lg-min) {
  .gallery {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
}
</style>
