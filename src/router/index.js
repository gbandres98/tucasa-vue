import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("@/views/HomeView.vue"),
        },
        {
            path: "/editor",
            name: "editor",
            component: () => import("@/views/EditorView.vue"),
        },
        {
            path: "/micasa",
            name: "micasa",
            component: () => import("@/views/ProjectView.vue"),
        },
        {
            path: "/backoffice/opciones",
            name: "opciones",
            component: () => import("@/views/backoffice/OptionsView.vue"),
        },
        {
            path: "/backoffice/terrenos",
            name: "terrenos",
            component: () => import("@/views/backoffice/TerrainsView.vue"),
        },
        {
            path: "/backoffice/staff",
            name: "staff",
            component: () => import("@/views/backoffice/StaffView.vue"),
        },
        {
            path: "/backoffice",
            name: "backoffice",
            component: () => import("@/views/backoffice/HomesView.vue"),
        },
    ],
});
export default router;
//# sourceMappingURL=index.js.map