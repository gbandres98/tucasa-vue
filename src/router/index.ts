import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import EditorView from "@/views/EditorView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/editor",
    name: "editor",
    component: EditorView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
