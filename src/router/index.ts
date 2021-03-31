import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "Home", component: () => import("@/pages/Home.vue") },
  {
    path: "/loginwithtoken",
    name: "loginwithtoken",
    component: () => import("@/pages/Login.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
