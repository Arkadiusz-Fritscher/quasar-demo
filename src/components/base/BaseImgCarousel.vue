<script setup>
import { ref } from "vue";

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits(["update:modelValue"]);

const fullscreen = ref(false);
const slide = ref(0);

const closeCarousel = () => {
  emits("update:modelValue", false);
};
</script>

<template>
  <teleport to="body">
    <q-dialog
      :model-value="modelValue"
      full-width
      full-height
      class="q-pa-lg relative-position"
    >
      <q-carousel
        swipeable
        animated
        arrows
        v-model="slide"
        v-model:fullscreen="fullscreen"
        infinite
      >
        <q-carousel-slide v-for="(img, i) in images" :key="i" :name="i">
          <q-img :src="img" fit="scale-down" />
        </q-carousel-slide>

        <template v-slot:control>
          <q-carousel-control position="bottom-right" :offset="[18, 18]">
            <q-btn
              push
              round
              dense
              color="white"
              text-color="primary"
              :icon="
                fullscreen ? 'mdi-arrow-collapse-all' : 'mdi-arrow-expand-all'
              "
              @click="fullscreen = !fullscreen"
            />
          </q-carousel-control>

          <q-carousel-control position="top-right" :offset="[18, 18]">
            <q-btn
              push
              round
              dense
              color="white"
              text-color="primary"
              icon="mdi-close"
              @click="closeCarousel"
            />
          </q-carousel-control>
        </template>
      </q-carousel>
    </q-dialog>
  </teleport>
</template>

<style scoped>
.q-img {
  max-inline-size: 100%;
  max-block-size: auto;
}
</style>
