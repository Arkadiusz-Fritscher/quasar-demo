<script setup>
import { ref } from "vue";
import TheSidebar from "src/components/imgSort/TheSidebar.vue";
import GroupCard from "src/components/imgSort/GroupCard.vue";
const showBuildingList = ref(true);
</script>

<template>
  <q-page padding>
    <TheSidebar v-model="showBuildingList" />
    <div class="q-gutter-md row">
      <GroupCard v-for="n in 14" :key="n" :id="`group-${n}`">
        <q-card v-for="n in 11" :key="n" flat bordered>
          <img src="https://cdn.quasar.dev/img/parallax2.jpg" />

          <q-item>
            <q-item-section>
              <q-item-label>GOPRO65231</q-item-label>
              <q-item-label caption>24.06.22 16:41</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </GroupCard>
    </div>
  </q-page>
</template>

<style scoped></style>
