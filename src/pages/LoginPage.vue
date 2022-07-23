<script setup>
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useStore } from "src/stores/store";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

const $q = useQuasar();
const store = useStore();
const router = useRouter();

const login = async () => {
  try {
    const { data } = await api.post("/api/auth/local", {
      identifier: "mail.95qm@gmail.com",
      password: "esweeswe",
    });

    $q.cookies.set("strapi_jwt", data.jwt);
    store.user = data.user;
    store.token = data.jwt;

    router.push({ name: "home" });
  } catch (err) {
    console.log(err);
  }
};

onBeforeMount(() => {
  if (store.user) {
    router.push({ name: "home" });
  }
});
</script>

<template>
  <div>
    <q-btn @click="login">Login</q-btn>
  </div>
</template>

<style scoped></style>
