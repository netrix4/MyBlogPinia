import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/posts",
    name: "Posts",
    component: () => import("../views/PostList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin.vue"),
    meta: {
      requiresAuth: true,
      requiresRole: ["admin"],
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Verificar autenticación al iniciar
  if (!authStore.isAuthenticated) {
    await authStore.checkAuth();
  }

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresRole = to.meta.requiresRole;

  if (requiresAuth && !authStore.isAuthenticated) {
    // Guardar la ruta a la que intentaba acceder
    next({
      name: "Login",
      query: { redirect: to.fullPath },
    });
  } else if (requiresRole && !requiresRole.includes(authStore.userRole)) {
    // Usuario no tiene el rol necesario
    next({ name: "Home" });
  } else if (to.name === "Login" && authStore.isAuthenticated) {
    // Si ya está autenticado y va a login, redirigir a home
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
