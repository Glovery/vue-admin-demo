import Vue from "vue";
import VueRouter from "vue-router";
import commonRoutes from "./common";

Vue.use(VueRouter);
const redirect = {
  path: "*",
  redirect: "/login"
};
const routes = [...commonRoutes, redirect];

const router = new VueRouter({
  routes
});

export default router;
