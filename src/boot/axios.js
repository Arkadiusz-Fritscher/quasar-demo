import { boot } from "quasar/wrappers";
import axios from "axios";
// import { useStore } from "src/stores/store";
// import { Cookies } from "quasar";

const api = axios.create({ baseURL: "http://localhost:1337" });
// const store = useStore();

export default boot(({ app, router, store }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  // const $store = useStore(store);
  // const hasToken = Cookies.has('strapi_jwt')

  // if(hasToken) {
  //   api.defaults.headers.common['Authorization'] = `Bear ${Cookies.get('strapi_jwt')}`

  //   if(!$store.user) {

  //   }
  // }

  // router.beforeEach(({ to, from, next }) => {
  //   if(hasToken && !$store.user) {
  //     api.get('/api/users/me')
  //   }
  // });
});

export { axios, api };
