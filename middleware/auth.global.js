// middleware/auth.global.js
import { navigateTo } from "#app";
import { useAuth } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated, initAuth } = useAuth();

  if (process.client) {
    initAuth();
  }

  const publicRoutes = ["/login"];

  //   if (isAuthenticated.value && to.path === "/login") {
  //     return navigateTo("/", { replace: true });
  //   }

  if (!publicRoutes.includes(to.path) && !isAuthenticated.value) {
    if (process.client) {
      window.alert("Você precisa estar logado para acessar o conteúdo.");
    }

    const redirectQuery =
      to.fullPath && to.fullPath !== "/" && to.path !== "/login"
        ? { redirect: to.fullPath }
        : undefined;

    return navigateTo(
      { path: "/login", query: redirectQuery },
      { replace: true }
    );
  }
});
