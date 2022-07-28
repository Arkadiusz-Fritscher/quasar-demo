<script setup>
import NavigationMenuLink from "src/components/navigation/NavigationMenuLink.vue";
const menuLinks = [
  {
    title: "Bauwerke",
    caption: "Liste aller Bauwerke",
    icon: "mdi-home",
    link: { name: "home" },
  },
  {
    title: "Sortieren",
    caption: "Helfer zum Localisieren und sortieren von Bildern.",
    icon: "mdi-image-search",
    link: { name: "sort" },
    visible: "desktop",
  },
];
</script>

<template>
  <q-drawer bordered overlay>
    <q-scroll-area class="fit">
      <q-list>
        <q-item class="lt-md">
          <q-toolbar>
            <q-btn
              flat
              dense
              round
              icon="mdi-close"
              @click="$emit('update:modelValue', (modelValue = false))"
            />
          </q-toolbar>
        </q-item>

        <NavigationMenuLink
          v-for="link in menuLinks"
          :key="link.title"
          v-bind="link"
          class="nav-link"
          :class="{
            'desktop-only': link.visible === 'desktop',
            'mobile-only': link.visible === 'mobile',
          }"
        />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<style scoped lang="scss">
.q-router-link--active {
  color: initial;
}

.q-router-link--exact-active {
  color: $primary;
}

.nav-link:first-child {
  padding-top: 1rem;
}
</style>
