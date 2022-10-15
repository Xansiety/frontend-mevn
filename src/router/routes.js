const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "",
        name: "Home",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "protected",
        name: "protected",
        component: () => import("pages/ProtectedPage.vue"),
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
