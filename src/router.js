import Vue from "vue";
import VueRouter from "vue-router";
import GoodsList from "@/components/GoodsList";

Vue.use(VueRouter);

const routes = [
  {
    path: "/goods",
    name: "GoodsList",
    component: GoodsList
  },
  { path: "*", redirect: "/goods" }
];

export default new VueRouter({
  routes,
  mode: "history"
});
