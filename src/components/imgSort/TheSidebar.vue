<script setup>
import SidebarItem from "./SidebarItem.vue";
import { useFiles } from "src/stores/files";

const files = useFiles();
</script>

<template>
  <q-drawer
    :width="250"
    behavior="desktop"
    bordered
    side="right"
    class="bg-grey-1"
  >
    <q-scroll-area class="fit">
      <q-list>
        <template v-for="group of files.sortedGroups" :key="group">
          <SidebarItem :to="{ hash: `#${group}` }" :group="group" />
          <q-separator spaced inset />
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<style scoped></style>
