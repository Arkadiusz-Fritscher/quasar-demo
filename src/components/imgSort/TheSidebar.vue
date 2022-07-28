<script setup>
import SidebarItem from "./SidebarItem.vue";
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
        <template v-for="n in 15" :key="n">
          <SidebarItem :to="{ hash: `#group-${n}` }" />
          <q-separator spaced inset />
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<style scoped></style>
