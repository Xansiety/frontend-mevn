import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { useUserStore } from "../stores/user-store";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    const requireAuth = to.meta.auth;
    const userStore = useUserStore();

    // si existe el token en memoria
    if (userStore.token) {
      return next();
    }

    // si no existe el token (se refrescó el sitio web) v2
    if (requireAuth || sessionStorage.getItem("user")) {
      // necesitamos generar el token de nuevo, por que el usuario uede actualizar
      // y asi no perdemos el token de session
      await userStore.refreshToken();
      // Validamos que el token este en forma virtual
      if (userStore.token) {
        return next();
      }
      // Si no se cumplen las condiciones lo volvemos al login
      return next("/login");
    }
    // Siempre debemos de retornar un next()
    return next();

    // si no existe el token (se refrescó el sitio web) v1
    // if (sessionStorage.getItem("user")) {
    //   await userStore.refreshToken();

    //   if (requiredAuth) {
    //     // validar al usuario o token
    //     if (userStore.token) {
    //       return next();
    //     }
    //     return next("/login");
    //   } else {
    //     return next();
    //   }
    // } else {
    //   if (requiredAuth) {
    //     await userStore.refreshToken();
    //     if (userStore.token) {
    //       return next();
    //     }
    //     return next("/login");
    //   }
    //   return next();
    // }
  });

  return Router;
});
