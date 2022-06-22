import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";

const Signin = () =>
  import(/* webpackChunkName: "signin_page" */ "@/views/Signin.vue");
const Signup = () =>
  import(/* webpackChunkName: "signup_page" */ "@/views/Signup.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/signin",
    name: "SigninPage",
    component: Signin,
    meta: {
      layout: "empty",
    },
  },
  {
    path: "/signup",
    name: "SignupPage",
    component: Signup,
    meta: {
      layout: "empty",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (_, __, next) => {
  await store.commit("CLEAR_ERRORS");
  next();
});
export default router;
