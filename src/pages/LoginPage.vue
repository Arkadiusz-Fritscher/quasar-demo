<script setup>
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useStore } from "src/stores/store";
import { ref } from "vue";
import { useRouter } from "vue-router";

const $q = useQuasar();
const store = useStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const savePassword = ref(false);
const isLoading = ref(false);
const hasError = ref({ error: false, message: "" });

const login = async () => {
  try {
    isLoading.value = true;

    delete api.defaults.headers.common["Authorization"];
    const { data } = await api.post("/api/auth/local", {
      identifier: email.value,
      password: password.value,
    });

    if (savePassword.value) {
      $q.cookies.set("strapi_jwt", data.jwt, {
        expires: 14,
        path: "/",
        sameSite: "Strict",
        secure: true,
      });
    } else {
      window.sessionStorage.setItem("strapi_jwt", data.jwt);
    }

    store.user = data.user;
    store.token = data.jwt;
    isLoading.value = false;

    router.push({ name: "home" });
  } catch (err) {
    isLoading.value = false;
    console.log(err.message);
    console.log(err);

    if (err.response.status === 400) {
      hasError.value.error = true;
      hasError.value.message =
        "Die E-Mail-Adresse oder das Passwort ist falsch";
    }
  }
};
</script>

<template>
  <q-page padding class="row justify-center items-center">
    <div class="row">
      <q-card class="q-pa-lg shadow-1">
        <q-card-section>
          <h5 class="text-center q-mt-md text-weight-bold">Login</h5>
        </q-card-section>

        <q-card-section>
          <q-form class="q-gutter-md" @submit="login">
            <q-input
              v-model="email"
              type="email"
              label="Email"
              clearable
              filled
              square
              lazy-rules
              :error="hasError.error"
              :error-message="hasError.message"
              :loading="isLoading"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Email darf nicht leer sein',
              ]"
            />

            <q-input
              v-model="password"
              type="password"
              label="Password"
              clearable
              filled
              square
              lazy-rules
              :error="hasError.error"
              :error-message="hasError.message"
              :loading="isLoading"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Email darf nicht leer sein',
              ]"
            />

            <q-toggle
              v-model="savePassword"
              label="Cookie setzen um eingeloggt zu bleiben."
            />

            <q-card-actions>
              <q-btn
                label="Login"
                size="lg"
                color="primary"
                class="full-width"
                type="submit"
                :loading="isLoading"
              />
            </q-card-actions>
          </q-form>
        </q-card-section>

        <!-- <q-card-actions>
          <q-btn
            label="Login"
            size="lg"
            color="primary"
            class="full-width"
            type="submit"
          />
        </q-card-actions> -->
      </q-card>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.q-card {
  width: 90vw;
}

@media (min-width: $breakpoint-sm-min) {
  .q-card {
    max-width: 460px;
  }
}
</style>
