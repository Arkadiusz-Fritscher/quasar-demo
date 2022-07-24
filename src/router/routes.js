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
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: ":id",
        name: "building",
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
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
