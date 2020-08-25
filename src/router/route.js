const layout = () => import("@/layout/layout.vue");
const home = () => import("@/pages/home");

const routes = [
  {
    path: "/",
    component: layout,
    children: [
      {
        path: "index",
        name: "index",
        component: home
      }
    ]
  }
];

export default routes;
