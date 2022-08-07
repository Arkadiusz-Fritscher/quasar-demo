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
</script> -->

<script setup>
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import BuildingEditDialog from "src/components/buildings/BuildingEditDialog.vue";
import { useStore } from "src/stores/store";

const props = defineProps({
  building: {
    type: Object,
    required: true,
  },
});

const store = useStore();
const route = useRoute();
const router = useRouter();

const goBack = () => {
  router.go(-1);
};

const needGetOff = computed(() => {
  return props.building.attributes.type.toLowerCase() === "armaturenschacht"
    ? "Notwendig"
    : "Nicht notwendig";
});

const isDialogOpen = ref(false);

// Cloudinary Image Src

const buildingThumbnail = computed(() => {
  return props.building.attributes.thumbnail?.data
    ? props.building.attributes.thumbnail?.data?.attributes?.url
    : "placeholder/noImg@1x.png";
});

const buildingImages = computed(() => {
  return props.building.attributes.images?.data
    ? props.building.attributes.images?.data
    : false;
});

// const host = "https://res.cloudinary.com/dsqqvekth/image/upload";

// const imgSrc = computed(() => {
//   if (props.attributes?.provider_metadata) {
//     const ext = props.attributes.ext;
//     const file = props.attributes.provider_metadata.public_id;
//     return `${host}/w_${300}/${file}${ext}`;
//   }

//   if (props.attributes?.url) {
//     return props.attributes.url;
//   }

//   return "/noImg@0.25x.png";
// });

// const createSrcset = (path, file, ext) => {
//   const breakpoints = [480, 960, 1440, 1920];
//   let srcSet = "";

//   breakpoints.forEach((breakpoint) => {
//     srcSet += `${path}/w_${breakpoint}/${file}${ext} ${breakpoint}w,`;
//   });

//   return srcSet;
// };

// const srcSet = computed(
//   (meta = props.building.attributes?.provider_metadata || false) => {
//     if (meta) {
//       const ext = props.attributes.ext;
//       const public_id = meta.public_id;

//       return createSrcset(host, public_id, ext);
//     }

//     return `

//         /noImg@0.25x.png  480w,
//         /noImg@0.5x.png   960w,
//         /noImg@0.75x.png 1440w,
//         /noImg@1x.png    1920w

//     `;
//   }
// );
</script>

<template>
  <q-page padding>
    <BuildingEditDialog v-model="isDialogOpen" :currentBuilding="building" />
    <section>
      <div class="full-width row no-wrap justify-between items-center">
        <q-btn
          icon="mdi-chevron-left"
          size="md"
          flat
          round
          @click="goBack"
          v-if="route.name === 'building'"
        />
        <h4 class="text-center text-weight-bold col q-my-md">
          {{ building.attributes.barcode }}
        </h4>

        <q-btn
          icon="mdi-pencil"
          flat
          round
          v-if="store.canUserEdit && route.name === 'building'"
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
        :src="buildingThumbnail"
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
    <section class="img-gallery" v-if="buildingImages">
      <q-img
        v-for="image in buildingImages"
        :ratio="4 / 3"
        :src="image.attributes.url"
        :key="image.id"
      >
        <!-- <div class="absolute-bottom-right text-subtitle2" v-if="i === 1">
          Hauptbild
        </div> -->
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
</style>
