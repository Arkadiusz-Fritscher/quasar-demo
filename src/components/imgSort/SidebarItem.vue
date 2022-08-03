<script setup>
import { computed } from "vue";
import { useFiles } from "src/stores/files";

const props = defineProps({
  group: {
    type: String,
    required: true,
  },
});

const { files, unknownGroupName } = useFiles();
const imageCount = computed(() => {
  return files.filter(
    (file) =>
      file.data.barcode === props.group || file.data.related === props.group
  ).length;
});

const iconStyle = computed(() => {
  return props.group === unknownGroupName ? "red-12" : "secondary";
});
</script>

<template>
  <q-item class="q-mt-sm">
    <q-item-section side>
      <q-icon name="mdi-folder" :color="iconStyle" />
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
