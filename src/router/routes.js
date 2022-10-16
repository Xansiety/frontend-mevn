const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "/register",
        name: "register",
        component: () => import("pages/RegisterPage.vue"),
      },
      {
        path: "/home",
        name: "home",
        meta: {
          auth: true,
        },
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/protected",
        name: "protected",
        meta: {
          auth: true,
        },
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
