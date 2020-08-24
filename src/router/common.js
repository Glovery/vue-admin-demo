const login = () => import("@/pages/common/login.vue");

const routes = [
  {
    path: "/login",
    name: "login",
    component: login
  }
];

export default routes;
