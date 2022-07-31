<script setup>
import { computed } from "vue";
import { useFiles } from "src/stores/files";

const props = defineProps({
  group: {
    type: String,
    required: true,
  },
});

const { files } = useFiles();
const imageCount = computed(() => {
  return files.filter(
    (file) => file.barcode === props.group || file.related === props.group
  ).length;
});
</script>

<template>
  <q-item class="q-mt-sm">
    <q-item-section side>
      <q-icon name="mdi-folder" color="secondary" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ group }}</q-item-label>
      <q-item-label caption>{{
        `${imageCount} ${imageCount === 1 ? "Bild" : "Bilder"}`
      }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped>
.q-router-link--active {
  color: inherit;
}
</style>
