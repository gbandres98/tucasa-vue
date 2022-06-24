import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/editor",
      name: "editor",
      component: () => import("@/views/EditorView.vue"),
    },
    {
      path: "/casas",
      name: "casas",
      component: () => import("@/views/backoffice/HomesView.vue"),
    },
  ],
});

export default router;
