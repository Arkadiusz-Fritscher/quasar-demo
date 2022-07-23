import { boot } from "quasar/wrappers";
import { api } from "boot/axios";

import { useStore } from "src/stores/store";
import { Cookies } from "quasar";

const hasToken = Cookies.has("strapi_jwt");

if (hasToken) {
  api.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
    "strapi_jwt"
  )}`;
}

export default boot(({ app, router, store }) => {
  const $store = useStore(store);

  const fetchUser = async () => {
    try {
      const { data } = await api.get("/api/users/me");
      $store.user = data;
    } catch (err) {
      console.log(err);
    }
  };

  if (hasToken && !$store.token) {
    $store.token = Cookies.get("strapi_jwt");
  }

  if (hasToken && !$store.user) {
    fetchUser();
  }

  router.beforeEach((to, from) => {
    if (to.meta.auth && !$store.token) {
      console.log("user", $store.user);
      return { name: "login" };
    }
  });
});

// export { axios, api };
