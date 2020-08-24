import Vue from "vue";
import VueRouter from "vue-router";
import commonRoutes from "./common";
import pageRoutes from "./route";

Vue.use(VueRouter);
const redirect = {
  path: "*",
  redirect: "/login"
};
const routes = [...commonRoutes, ...pageRoutes, redirect];

const router = new VueRouter({
  routes
});

export default router;
