<script setup>
import SidebarItem from "./SidebarItem.vue";
import { useFiles } from "src/stores/files";
import { useStore } from "src/stores/store";
import useZip from "src/composables/jszip";
import { ref } from "vue";
import saveFile from "src/composables/fileSaver";

const files = useFiles();
const store = useStore();
const { generateZip } = useZip();

const isAddNewGroupModalOpen = ref(false);
const newGroupName = ref("");

const handleFileDownload = async () => {
  if (files.files.length) {
    generateZip(files.files).then((zipped) => {
      saveFile(zipped);
    });
  }
};
</script>

<template>
  <q-drawer
    :width="250"
    behavior="desktop"
    bordered
    side="right"
    class="bg-grey-1"
    relative-position
  >
    <q-dialog v-model="isAddNewGroupModalOpen" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Neue Gruppe erstellen</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="newGroupName"
            autofocus
            @keyup.enter="isAddNewGroupModalOpen = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Abbrechen" v-close-popup />
          <q-btn
            flat
            label="Erstellen"
            v-close-popup
            @click="files.createNewGroup(newGroupName)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-scroll-area class="fit">
      <q-list>
        <template v-for="group of files.sortedGroups" :key="group">
          <SidebarItem :to="{ hash: `#${group}` }" :group="group" />
          <q-separator spaced inset />
        </template>
      </q-list>
    </q-scroll-area>

    <q-list bordered separator class="absolute-bottom options z-top">
      <q-item>
        <q-item-section>
          <q-btn
            label="Grupper erstellen"
            color="secondary"
            unelevated
            icon="mdi-folder-plus"
            @click="isAddNewGroupModalOpen = true"
          />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-btn
            label="Download"
            color="primary"
            unelevated
            icon="mdi-download"
            :disable="!files.files.length"
            @click="handleFileDownload"
          />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label caption>GPS Radius</q-item-label>
          <q-slider
            v-model="store.gpsRadius"
            :min="4"
            :max="20"
            :step="1"
            snap
            label
            color="primary"
          />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label caption>Zeit zwichen Fotos</q-item-label>
          <q-slider
            v-model="store.timeRange"
            :min="1"
            :max="5"
            :step="0.5"
            snap
            label
            color="primary"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<style scoped lang="scss">
$optionHeight: 223.789px;

.options {
  height: $optionHeight;
  background-color: $grey-2;
}

.q-scrollarea {
  margin-bottom: $optionHeight;
  height: calc(100% - #{$optionHeight}) !important;
}
</style>
