import { api } from "src/boot/axios";

const redirectLink = async (to, from, next) => {
  // console.log(to.params.nanoId);
  try {
    const { data } = await api.get(
      `${process.env.MY_REDIRECT_DOMAIN}/search/${to.params.nanoId}`
    );
    console.log(data.longLink);
    window.location.href = data.longLink;
    next();
  } catch (error) {
    console.log(error);
    next({ name: "404" });
  }
};

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
      {
        path: "/:nanoId",
        name: "redirect",
        component: () => import("pages/RedirectPage.vue"),
        beforeEnter: redirectLink, // Esto se ejecuta antes de entrar y renderizar la page.vue
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
