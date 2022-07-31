const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      auth: true,
    },
    children: [
      {
        path: "",
        name: "home",
        meta: {
          title: "Bauwerk Übersicht",
        },
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/sortieren",
        name: "sort",
        meta: {
          title: "Bilder sortieren",
          visible: "desktop",
        },
        // props: (route) => ({ query: route.query }),
        component: () => import("src/pages/ImgSortPage.vue"),
      },
      {
        path: "/sortieren",
        name: "sort",
        meta: {
          title: "Bilder sortieren",
          visible: "desktop",
        },
        // props: (route) => ({ query: route.query }),
        component: () => import("src/pages/ImgSortPage.vue"),
      },
      {
        path: ":id",
        name: "building",
        meta: {
          title: "Bauwerk Details",
        },
        component: () => import("src/pages/BuildingPage.vue"),
      },
    ],
  },

  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
    meta: { auth: false },
    children: [
      {
        path: "",
        name: "login",
        component: () => import("pages/LoginPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    name: "404",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
