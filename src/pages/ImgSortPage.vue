<script setup>
import { ref } from "vue";
import TheSidebar from "src/components/imgSort/TheSidebar.vue";
import GroupCard from "src/components/imgSort/GroupCard.vue";

import { useFiles } from "src/stores/files";

const files = useFiles();
const showBuildingList = ref(true);
</script>

<template>
  <q-page padding>
    <!-- <BaseImgCarousel v-model="showCarousel" :images="fullImages" /> -->
    <TheSidebar v-model="showBuildingList" v-if="files.groups.length" />

    <div class="gallery" v-if="files.groups.length">
      <GroupCard
        v-for="group of files.sortedGroups"
        :key="group"
        :group="group"
        :id="group"
      >
      </GroupCard>
    </div>
    <div v-else class="empty absolute-center">
      <div class="text-h5 text-weight-bold q-mb-sm">
        Wähle Bilder zum Sortieren aus
      </div>

      <div class="text-caption">
        Die Bilder werden nicht hochgeladen, stattdessen werden sie direkt vom
        Computer gelesen. Deswegen wirst du vom Browser nach der erlaubnis
        gefragt. Solltest du nicht zustimmen ist es nicht möglich die Bilder zu
        sortieren.
      </div>

      <q-btn
        label="Bilder auswählen"
        icon="mdi-folder-multiple-image"
        color="primary"
        unelevated
        class="q-mt-lg"
      />
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 0.75rem;
}

.empty {
  text-align: center;
  max-width: 58ch;
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
