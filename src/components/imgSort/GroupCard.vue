<script setup>
import { computed } from "vue";
import { useFiles } from "src/stores/files";
import ImageCard from "src/components/imgSort/ImageCard.vue";

const props = defineProps({
  group: {
    type: String,
    required: true,
  },
});

const fileStore = useFiles();

const relatedFiles = computed(() => {
  if (!fileStore.files.length) return [];
  return fileStore.files.filter(
    (file) =>
      file.data.barcode?.toLowerCase() === props.group.toLowerCase() ||
      file.data.related?.toLowerCase() === props.group.toLowerCase()
  );
});

const showInCarousel = (images, slide) => {
  fileStore.currentCarouselSlide = slide;
  fileStore.carouselImages = images?.map((file) => file.url);
  fileStore.isCarouselOpen = true;
};

const avatarColor = computed(() => {
  return props.group === fileStore.unknownGroupName ? "red-12" : "secondary";
});

const buildingLocation = computed(() => {
  const fileWithGPS = fileStore.files.find(
    (file) => props.group === file.data.barcode && file.data.location
  );

  return fileWithGPS ? fileWithGPS.data.location : "Unbekannt";
});

const buildingType = computed(() => {
  const fileWithGPS = fileStore.files.find(
    (file) => props.group === file.data.barcode && file.data.type
  );

  return fileWithGPS ? fileWithGPS.data.type : false;
});
</script>

<template>
  <q-card flat bordered class="group-card">
    <q-item class="card-header bg-grey-2">
      <q-item-section avatar>
        <q-avatar
          :color="avatarColor"
          text-color="white"
          icon="mdi-select-group"
        />
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-h6">{{ group }}</q-item-label>
        <q-item-label caption
          ><span v-if="buildingType">{{ buildingType }} -</span>
          {{ buildingLocation }}</q-item-label
        >
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section class="q-pa-sm q-ma-none">
      <div class="gallery">
        <ImageCard
          v-for="(file, i) in relatedFiles"
          :key="file.id"
          :content="file"
          @click="showInCarousel(relatedFiles, i)"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
.group-card {
  align-self: flex-start;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, calc(20% - 0.4rem)));
  gap: 0.5rem;
}
</style>
