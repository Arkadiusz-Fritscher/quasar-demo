<script setup>
defineProps({
  icon: {
    type: String,
    default: "",
  },
  link: {
    type: [Object, String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <q-item clickable tag="a" :to="link" class="q-my-sm">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped></style>
