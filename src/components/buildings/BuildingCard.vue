<script setup>
defineProps({
  building: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div>
    {{ building }}
  </div>
</template>

<style scoped></style>
