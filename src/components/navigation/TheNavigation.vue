<script setup>
import { useStore } from "src/stores/store";
import { useRouter, useRoute } from "vue-router";
import { computed, ref } from "vue";
import { useQuasar } from "quasar";
import TheNavSidebar from "src/components/navigation/TheNavSidebar.vue";

const $q = useQuasar();
const store = useStore();
const router = useRouter();
const route = useRoute();

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const search = ref("");
const searchResults = ref([]);

const isLoadingOptions = ref(false);
const searchBuilding = (val, update) => {
  update(async () => {
    if (val === "") {
      searchResults.value = [];
    } else {
      isLoadingOptions.value = true;
      const options = await store.findBuilding(val);

      searchResults.value = options;
      isLoadingOptions.value = false;
    }
  });
};

const handleOptionClick = (id) => {
  document.activeElement?.blur();
  search.value = "";
  router.push({ name: "building", params: { id } });
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

const avatarName = computed(() => {
  if (store.user?.firstname && store.user?.lastname) {
    return `${store.user.firstname
      .toUpperCase()
      .charAt(0)}.${store.user.lastname.toUpperCase().charAt(0)}`;
  } else if (store.user?.firstname) {
    return `${store.user?.firstname.toUpperCase().charAt(0)}`;
  } else if (store.user?.lastname) {
    return `${store.user?.lastname.toUpperCase().charAt(0)}`;
  } else if (store.user?.username) {
    return `${store.user?.username.toUpperCase().charAt(0)}`;
  } else {
    return "FW";
  }
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

      <q-toolbar-title :class="{ hidden: $q.screen.lt.md }">{{
        route.meta.title || ""
      }}</q-toolbar-title>

      <q-space />

      <q-select
        use-input
        v-model="search"
        @filter="searchBuilding"
        @add="handleOptionClick"
        :options="searchResults"
        dark
        standout
        dense
        clearable
        hide-dropdown-icon
        behavior="menu"
        label="Suchen"
        :class="selectionStyle"
        :loading="isLoadingOptions"
      >
        <template v-slot:no-option>
          <!-- <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item> -->
        </template>

        <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            @click="handleOptionClick(scope.opt.id)"
          >
            <q-item-section>
              <q-item-label>{{ scope.opt.attributes.barcode }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>

        <template v-slot:selected v-if="search">
          {{ search.attributes.barcode }}
        </template>

        <template #prepend>
          <q-icon name="mdi-magnify" />
        </template>
      </q-select>

      <q-avatar
        rounded
        color="secondary"
        font-size="1rem"
        text-color="white"
        class="q-ml-md"
        >{{ avatarName }}</q-avatar
      >
    </q-toolbar>
  </q-header>

  <TheNavSidebar v-model="isMenuOpen" />
</template>
