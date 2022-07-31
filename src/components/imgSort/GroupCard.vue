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
    (file) => file.barcode === props.group || file.related === props.group
  );
});

const showInCarousel = (images, slide) => {
  fileStore.currentCarouselSlide = slide;
  fileStore.carouselImages = images?.map((file) => file.img);
  fileStore.isCarouselOpen = true;
};
</script>

<template>
  <q-card flat bordered class="group-card">
    <q-item class="card-header bg-grey-2">
      <q-item-section avatar>
        <q-avatar color="primary" text-color="white" icon="mdi-select-group" />
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-h6">{{ group }}</q-item-label>
        <q-item-label caption>Subhead</q-item-label>
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
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 0.5rem;
}
</style>
