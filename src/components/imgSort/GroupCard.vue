<script setup></script>

<template>
  <q-card flat bordered>
    <q-item class="card-header bg-grey-2">
      <q-item-section avatar>
        <q-avatar color="primary" text-color="white" icon="mdi-select-group" />
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-h6">Title</q-item-label>
        <q-item-label caption>Subhead</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section class="q-pa-md q-ma-none">
      <div class="gallery">
        <slot></slot>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}
</style>
