<script setup>
import { onBeforeMount, ref } from "vue";
import TheSidebar from "src/components/imgSort/TheSidebar.vue";
import GroupCard from "src/components/imgSort/GroupCard.vue";
import useFileSystem from "src/composables/fileSystem";
import { useFiles } from "src/stores/files";
import { useRoute, useRouter } from "vue-router";

const { openFiles } = useFileSystem();
const route = useRoute();
const router = useRouter();

const files = useFiles();
const showBuildingList = ref(true);

onBeforeMount(() => {
  const fileStore = useFiles();

  if (route.hash && !fileStore.files.length) {
    router.push({ name: "sort" });
  }
});
</script>

<template>
  <q-page padding>
    <TheSidebar v-model="showBuildingList" v-if="files.files.length" />

    <div class="gallery" v-if="files.files.length">
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
        sortieren. Diese funktion ist momentan nur in <b>Chrome</b> und
        <b>Edge</b> Browsern vefügbar. Solltest du Firefox oder Safari verwenden
        nutze bitte einen der genanten Browser oder sortieren die Bilder von
        Hand.
      </div>

      <q-btn
        label="Bilder auswählen"
        icon="mdi-folder-multiple-image"
        color="primary"
        unelevated
        class="q-mt-lg"
        @click="openFiles"
      />
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  gap: 0.75rem;
}

.empty {
  text-align: center;
  max-width: 58ch;
}

// @media (min-width: $breakpoint-sm-min) {
//   .gallery {
//     grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//   }
// }

// @media (min-width: $breakpoint-lg-min) {
//   .gallery {
//     grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
//   }
// }
</style>
