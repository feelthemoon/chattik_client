import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import store from "@/store";
import { Namespaces } from "@/store/modules/root/root.types";

const Signin = () =>
  import(/* webpackChunkName: "signin_page" */ "@/views/auth/Signin.vue");
const Signup = () =>
  import(/* webpackChunkName: "signup_page" */ "@/views/auth/Signup.vue");
const RecoverPassword = () =>
  import(
    /* webpackChunkName: "recover_page" */ "@/views/auth/RecoverPassword.vue"
  );
const NotFound = () =>
  import(/* webpackChunkName: "not_found_page" */ "@/views/NotFound.vue");
const VerifyAccount = () =>
  import(/* webpackChunkName: "verify_page" */ "@/views/auth/Verify.vue");
const CreateNewPassword = () =>
  import(
    /* webpackChunkName: "create_new_password_page" */ "@/views/CreateNewPassword.vue"
  );
const MainPage = () =>
  import(/* webpackChunkName: "main_page" */ "@/views/MainPage.vue");
const DialogPage = () =>
  import(/* webpackChunkName: "dialog_page" */ "@/views/Dialog.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: { path: "/im" },
  },
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
    path: "/new-password",
    name: "CreateNewPassword",
    component: CreateNewPassword,
    meta: {
      layout: "empty",
    },
    async beforeEnter(from, _, next: NavigationGuardNext) {
      if (!from.query.token) {
        next({ name: "NotFound" });
      }
      await store.dispatch("auth/verifyRecoverToken", from.query.token);
      if (
        store.getters.errorByNamespace(
          Namespaces.AUTH.NAMESPACE_RECOVER_TOKEN_VERIFY
        )
      ) {
        next({ name: "NotFound" });
      } else {
        next();
      }
    },
  },
  {
    path: "/im",
    name: "MainPage",
    component: MainPage,
    meta: {
      layout: "main",
      needsAuth: true,
    },
  },
  {
    path: "/im/@:username",
    name: "DialogPage",
    component: DialogPage,
    meta: {
      layout: "main",
      needsAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: {
      layout: "empty",
    },
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
