import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/default.vue";
import AuthenticationLayout from "@/layouts/Authentication.vue";
import Login from "@/pages/login.vue";
import Index from "@/pages/index.vue";
import Search from "@/pages/search.vue";
import History from "@/pages/history.vue";

const routes = [
  {
    path: "/",
    component: Index,
    meta: { layout: "authentication" },
  },
  {
    path: "/login",
    component: Login,
    meta: { layout: "authentication" },
  },
  {
    path: "/search",
    component: Search,
    meta: { layout: "default" },
  },
  {
    path: "/history",
    component: History,
    meta: { layout: "default" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const layout = to.meta.layout || "default";
  to.meta.layoutComponent =
    layout === "authentication" ? AuthenticationLayout : DefaultLayout;
  next();
});

export default router;
