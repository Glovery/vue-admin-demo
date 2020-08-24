const login = () => import("@/pages/common/login");

const routes = [
  {
    path: "/login",
    name: "login",
    component: login
  }
];

export default routes;
