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
</script>

<template>
  <q-page padding>
    <section v-if="building">
      <div class="full-width row no-wrap justify-between items-center">
        <q-btn icon="mdi-chevron-left" size="md" flat round @click="goBack" />
        <h3 class="text-center col">{{ building.attributes.barcode }}</h3>
        <q-btn icon="mdi-pencil" flat round v-if="!store.canUserEdit" />
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
        :ratio="16 / 6"
        fit="cover"
        :alt="building.attributes.barcode"
      />
    </section>
  </q-page>
</template>

<style scoped></style>
