import { boot } from "quasar/wrappers";
import { api } from "boot/axios";

import { useStore } from "src/stores/store";
import { Cookies } from "quasar";

const token =
  Cookies.get("strapi_jwt") || window.sessionStorage.getItem("strapi_jwt");

// Set default Axios Auth header
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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

  if (token && !$store.token) {
    $store.token = token;
  }

  if (token && !$store.user) {
    fetchUser();
  }
});

// export { axios, api };
