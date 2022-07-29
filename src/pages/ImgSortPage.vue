<script setup>
import { ref } from "vue";
import TheSidebar from "src/components/imgSort/TheSidebar.vue";
import GroupCard from "src/components/imgSort/GroupCard.vue";
import ImageCard from "src/components/imgSort/ImageCard.vue";
import { useSort } from "src/stores/sort";
import { useRoute } from "vue-router";
import BaseImgCarousel from "src/components/base/BaseImgCarousel.vue";

const sort = useSort();
const showBuildingList = ref(true);
const route = useRoute();
const showCarousel = ref(true);

const fullImages = ref([
  "https://images.unsplash.com/photo-1659015370021-2dd88216ef62?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3406&q=80",
  "https://images.unsplash.com/photo-1659100056660-908218f0affb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3764&q=80",
  "https://images.unsplash.com/photo-1659022684148-1b6e5f547315?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
]);
</script>

<template>
  <q-page padding>
    <BaseImgCarousel v-model="showCarousel" :images="fullImages" />
    <TheSidebar v-model="showBuildingList" />

    <div class="gallery">
      <GroupCard
        v-for="[group, files] of Object.entries(sort.groups)"
        :key="group"
        :group="group"
      >
        <ImageCard v-for="file in files" :key="file.id" :content="file" />
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

  // .group-card:last-child {
  //   flex: 0 1 calc(33% - 0.5rem);
  // }
}
</style>
