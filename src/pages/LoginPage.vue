<script setup>
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useStore } from "src/stores/store";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

const $q = useQuasar();
const store = useStore();
const router = useRouter();
const user = ref();

const login = async () => {
  user.value = "has clicked";
  try {
    const { data } = await api.post("/api/auth/local", {
      identifier: "mail.95qm@gmail.com",
      password: "esweeswe",
    });

    user.value = data;

    $q.cookies.set("strapi_jwt", data.jwt, {
      expires: 14,
      path: "/",
      sameSite: "Strict",
      secure: true,
    });
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
    <pre>{{ user }}</pre>
    <button @click="login">Login</button>
  </div>
</template>

<style scoped></style>
