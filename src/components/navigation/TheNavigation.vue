<script setup>
import NavigationMenuLinkVue from "./NavigationMenuLink.vue";
import useStore from "src/composables/store";
import { computed, ref } from "vue";
import { useQuasar } from "quasar";
const { store } = useStore();
const $q = useQuasar();

const menuLinks = [
  {
    title: "Bauwerke",
    caption: "Liste aller Bauwerke",
    icon: "mdi-home",
    link: { name: "home" },
  },
];

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const search = ref("");
const searchResults = ref([]);
const searchBuilding = async (val, update) => {
  if (val === "") {
    update(() => {
      searchResults.value = [];
    });

    return;
  }

  update(() => {
    const options = store.buildings
      .filter((building) =>
        building.barcode.toLocaleLowerCase().includes(val.toLocaleLowerCase())
      )
      .map((result) => result.barcode);

    searchResults.value = options;
  });
};

const selectionStyle = computed(() => {
  if ($q.screen.gt.md) {
    return "col-2";
  }

  if ($q.screen.gt.sm) {
    return "col-3";
  }

  if ($q.screen.gt.xs) {
    return "col-4";
  }

  return "col-7";
});
</script>

<template>
  <q-header reveal class="bg-primary text-white">
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="mdi-menu"
        aria-label="Menu"
        @click="toggleMenu"
      />

      <q-space />

      <q-select
        use-input
        v-model="search"
        @filter="searchBuilding"
        :options="searchResults"
        dark
        standout
        dense
        clearable
        hide-dropdown-icon
        behavior="menu"
        hide-selected
        fill-input
        :class="selectionStyle"
      >
        <template v-slot:no-option>
          <!-- <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item> -->
        </template>

        <template #prepend>
          <q-icon name="mdi-magnify" />
        </template>
      </q-select>

      <!-- <q-input
        dark
        dense
        standout
        outline
        v-model="search"
        input-class="text-right"
        class="q-ml-md"
      >
        <template v-slot:append>
          <q-icon v-if="search === ''" name="mdi-magnify" />
          <q-icon
            v-else
            name="mdi-close-circle"
            class="cursor-pointer"
            @click="search = ''"
          />
        </template>
      </q-input> -->

      <!-- <q-btn
        flat
        dense
        round
        icon="mdi-magnify"
        aria-label="Menu"
        @click="toggleMenu"
      /> -->
    </q-toolbar>
    <!-- <q-toolbar> search </q-toolbar> -->
  </q-header>

  <q-drawer v-model="isMenuOpen" bordered>
    <q-list>
      <!-- Show close button on small screens -->
      <q-toolbar class="lt-md">
        <q-btn flat dense round icon="mdi-close" @click="toggleMenu" />
      </q-toolbar>

      <NavigationMenuLinkVue
        v-for="link in menuLinks"
        :key="link.title"
        v-bind="link"
      />
    </q-list>
  </q-drawer>
</template>

<style scoped></style>
