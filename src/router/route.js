const home = () => import("@/pages/home");

const routes = [
  {
    path: "/index",
    name: "index",
    component: home
  }
];

export default routes;
