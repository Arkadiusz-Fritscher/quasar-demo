<!-- <script>
import { useStore } from "src/stores/store";
import { api } from "boot/axios";
import BuildingEditDialog from "src/components/buildings/BuildingEditDialog.vue";
import { ref } from "vue";

export default {
  async preFetch(ctx) {
    const store = useStore(ctx.store);

    try {
      const options = {
        params: { populate: "*" },
      };

      const { data } = await api.get(
        `/api/objects/${ctx.currentRoute.params.id}`,
        options
      );

      store.currentBuilding = data.data;
      return data.data;
    } catch (err) {
      console.log(err.message);

      if (err.response.status == 404) {
        ctx.redirect({ name: "404" });
      }
    }
  },
};
</script>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const building = computed(() => {
  return store.currentBuilding;
});

const goBack = () => {
  router.go(-1);
};

const needGetOff = computed(() => {
  return building.value.attributes.type.toLowerCase() === "armaturenschacht"
    ? "Notwendig"
    : "Nicht notwendig";
});

const isDialogOpen = ref(false);
</script>

<template>
  <q-page padding>
    <BuildingEditDialog v-model="isDialogOpen" :building="building" />
    <section v-if="building">
      <div class="full-width row no-wrap justify-between items-center">
        <q-btn icon="mdi-chevron-left" size="md" flat round @click="goBack" />
        <h4 class="text-center text-weight-bold col q-my-md">
          {{ building.attributes.barcode }}
        </h4>

        <q-btn
          icon="mdi-pencil"
          flat
          round
          v-if="store.canUserEdit"
          @click="isDialogOpen = !isDialogOpen"
        />
        <q-btn
          v-else
          icon="mdi-chevron-left"
          size="md"
          flat
          round
          style="pointer-events: none"
          color="transparent"
        />
      </div>
    </section>

    <section>
      <q-img
        :src="
          building.attributes.thumbnail.data
            ? building.attributes.thumbnail.data.attributes.url
            : 'https://placeimg.com/1600/900/nature'
        "
        :ratio="$q.screen.gt.xs ? 16 / 9 : 4 / 3"
        fit="cover"
        :alt="building.attributes.barcode"
        class="hero-img"
      />
    </section>
    <section>
      <ul class="data-list">
        <li class="data-item">
          <span class="data-item-label"> Barcode </span>
          <span class="data-item-value">
            {{ building.attributes.barcode }}
          </span>
        </li>

        <li class="data-item">
          <span class="data-item-label"> Adresse </span>
          <span class="data-item-value">
            {{ building.attributes.location }}
          </span>
        </li>

        <li class="data-item">
          <span class="data-item-label"> Art </span>
          <span class="data-item-value">
            {{ building.attributes.type }}
          </span>
        </li>

        <li class="data-item">
          <span class="data-item-label"> Abstieg </span>
          <span class="data-item-value">
            {{ needGetOff }}
          </span>
        </li>

        <li class="data-item data-item-description">
          <span class="data-item-label"> Bemerkung </span>
          <span class="data-item-value">
            {{ building.attributes.description }}
          </span>
        </li>
      </ul>
    </section>

    <q-separator class="q-mt-md q-mb-lg" />
    <section class="img-gallery">
      <q-img
        src="https://placeimg.com/600/400/nature"
        :ratio="4 / 3"
        v-for="i in 5"
        :key="i"
      >
        <div class="absolute-bottom-right text-subtitle2" v-if="i === 1">
          Hauptbild
        </div>
      </q-img>
    </section>
  </q-page>
</template>

<style scoped lang="scss">
.hero-img {
  max-height: 500px;
}

.data-list {
  list-style: none;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
}

.data-item {
  flex: 1 1 40%;
  display: flex;
  flex-direction: column;
}

.data-item-description {
  flex: 1 0 100%;
}

.data-item-label {
  font-weight: 500;
}

.data-item-value {
  color: $grey-8;
}

.img-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, 1fr);
  gap: 1rem;
}

@media (min-width: $breakpoint-sm-min) {
  .img-gallery {
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  }
}

@media (min-width: $breakpoint-sm-min) {
  .data-item {
    flex: 0 1 14%;
  }

  .data-item-description {
    flex: 1 0 20%;
  }
}
</style> -->

<script setup>
import TheBuildingDetail from "src/components/buildings/TheBuildingDetail.vue";
import { api } from "boot/axios";
import { onBeforeMount, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const currentBuilding = ref();
const isLoading = ref(false);

const fetchBuilding = async (id) => {
  try {
    isLoading.value = true;
    const options = {
      params: { populate: "*" },
    };

    const { data } = await api.get(`/api/objects/${id}`, options);

    currentBuilding.value = data.data;
    isLoading.value = false;
    return data.data;
  } catch (err) {
    console.log(err.message);

    if (err.response.status == 404) {
      router.push({ name: "404" });
    }
  }
};

onBeforeMount(() => {
  fetchBuilding(route.params.id);
});

watch(route, (value) => {
  fetchBuilding(value.params.id);
});
</script>

<template>
  <TheBuildingDetail :building="currentBuilding" v-if="!isLoading" />
</template>

<style scoped></style>
