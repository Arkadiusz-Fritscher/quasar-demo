<script setup>
import { ref } from "vue";
import { useFiles } from "src/stores/files";

const files = useFiles();
</script>

<template>
  <q-dialog v-model="files.isCarouselOpen" full-width full-height>
    <div>
      <q-carousel
        swipeable
        animated
        thumbnails
        v-model="files.currentCarouselSlide"
        height="100%"
      >
        <q-carousel-slide
          v-for="(img, i) in files.carouselImages"
          :key="i"
          :name="i"
          :img-src="img"
        />
      </q-carousel>
    </div>
  </q-dialog>
</template>

<style scoped>
.q-carousel__slide {
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
