<script>
import { useStore } from "src/stores/store";
import { api } from "boot/axios";

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
</script>

<template>
  <q-page padding>
    <section v-if="building">
      <div class="full-width row no-wrap justify-between items-center">
        <q-btn icon="mdi-chevron-left" size="md" flat round @click="goBack" />
        <h4 class="text-center text-weight-bold col q-my-md">
          {{ building.attributes.barcode }}
        </h4>
        <q-btn icon="mdi-pencil" flat round v-if="store.canUserEdit" />
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
  </q-page>
</template>

<style scoped lang="scss">
.q-img {
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

@media (min-width: $breakpoint-sm-min) {
  .data-item {
    flex: 0 1 14%;
  }

  .data-item-description {
    flex: 1 0 20%;
  }
}
</style>
