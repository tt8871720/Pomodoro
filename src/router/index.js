import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/pomo",
    name: "Pomo",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Pomo.vue"),
    children: []
  },
  {
    path: "/task",
    name: "Task",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Task.vue")
  },
  {
    path: "/analytics",
    name: "Analytics",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Analytics.vue")
  },
  {
    path: "/break",
    name: "Break",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Break.vue")
  },
  {
    path: "/test",
    name: "Test",
    component: () => import(/* webpackChunkName: "about" */ "../views/Test.vue")
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
