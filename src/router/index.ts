import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const Signin = () =>
  import(/* webpackChunkName: "signin_page" */ "@/views/Signin.vue");
const Signup = () =>
  import(/* webpackChunkName: "signup_page" */ "@/views/Signup.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
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

export default router;
