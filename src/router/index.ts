import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import store from "@/store";

const Signin = () =>
  import(/* webpackChunkName: "signin_page" */ "@/views/Signin.vue");
const Signup = () =>
  import(/* webpackChunkName: "signup_page" */ "@/views/Signup.vue");
const RecoverPassword = () =>
  import(/* webpackChunkName: "recover_page" */ "@/views/RecoverPassword.vue");
const NotFound = () =>
  import(/* webpackChunkName: "not_found_page" */ "@/views/NotFound.vue");
const VerifyAccount = () =>
  import(/* webpackChunkName: "verify_page" */ "@/views/Verify.vue");

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
  {
    path: "/recover",
    name: "RecoverPassword",
    component: RecoverPassword,
    meta: {
      layout: "empty",
    },
  },
  {
    path: "/verify",
    name: "VerifyAccount",
    component: VerifyAccount,
    meta: {
      layout: "empty",
    },
    beforeEnter(_, from: RouteLocationNormalized, next: NavigationGuardNext) {
      if (from.meta.verify) {
        next();
      } else {
        next({ name: "SignupPage" });
      }
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    await store.commit("CLEAR_ERRORS");
    next();
  }
);
export default router;
