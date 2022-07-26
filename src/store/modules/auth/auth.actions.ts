import { ActionTree } from "vuex";
import {
  AlertIcons,
  IRootState,
  Namespaces,
} from "@/store/modules/root/root.types";
import {
  IRecoverData,
  ISigninData,
  ISignupData,
} from "@/store/modules/auth/auth.types";
import { API_AUTH } from "@/api";
import router from "@/router";

const AuthActions: ActionTree<unknown, IRootState> = {
  async signin({ dispatch }, data: ISigninData) {
    try {
      dispatch(
        "updateLoading",
        { namespace: Namespaces.AUTH.NAMESPACE_SIGNIN, loading: true },
        { root: true }
      );
      await API_AUTH.signin(data);
    } catch (e: unknown) {
      dispatch(
        "updateErrors",
        { error: e, namespace: Namespaces.AUTH.NAMESPACE_SIGNIN },
        { root: true }
      );
    } finally {
      dispatch(
        "updateLoading",
        { namespace: Namespaces.AUTH.NAMESPACE_SIGNIN, loading: false },
        { root: true }
      );
    }
  },

  async signup({ dispatch }, data: ISignupData) {
    try {
      dispatch(
        "updateLoading",
        { namespace: Namespaces.AUTH.NAMESPACE_SIGNUP, loading: true },
        { root: true }
      );
      await API_AUTH.signup(data);
    } catch (e: unknown) {
      dispatch(
        "updateErrors",
        { error: e, namespace: Namespaces.AUTH.NAMESPACE_SIGNUP },
        { root: true }
      );
    } finally {
      dispatch(
        "updateLoading",
        { namespace: Namespaces.AUTH.NAMESPACE_SIGNUP, loading: false },
        { root: true }
      );
    }
  },

  async logout({ dispatch, rootGetters }) {
    try {
      localStorage.clear();
      dispatch(
        "updateLoading",
        { namespace: Namespaces.AUTH.NAMESPACE_LOGOUT, loading: true },
        { root: true }
      );
      await API_AUTH.logout(rootGetters.token);
      await router.push({ name: "SigninPage" });
    } catch (e: unknown) {
      dispatch(
        "updateErrors",
        { error: e, namespace: Namespaces.AUTH.NAMESPACE_LOGOUT },
        { root: true }
      );
    } finally {
      dispatch(
        "updateLoading",
        { namespace: Namespaces.AUTH.NAMESPACE_LOGOUT, loading: false },
        { root: true }
      );
    }
  },

  async recover({ dispatch }, data: IRecoverData) {
    try {
      dispatch(
        "updateLoading",
        { namespace: Namespaces.AUTH.NAMESPACE_RECOVER, loading: true },
        { root: true }
      );
      await API_AUTH.recoverPassword(data);
      dispatch(
        "updateAlerts",
        {
          type: "success",
          message: "Success",
          description: "Recover link sent to your email",
          showIcon: true,
          iconName: AlertIcons.SUCCESS_ICON,
        },
        { root: true }
      );
    } catch (e: unknown) {
      dispatch(
        "updateErrors",
        { error: e, namespace: Namespaces.AUTH.NAMESPACE_RECOVER },
        { root: true }
      );
    } finally {
      dispatch(
        "updateLoading",
        { namespace: Namespaces.AUTH.NAMESPACE_RECOVER, loading: false },
        { root: true }
      );
    }
  },

  async verifyRecoverToken({ dispatch }, token: string) {
    try {
      await API_AUTH.verifyRecoverToken(token);
    } catch (e) {
      dispatch(
        "updateErrors",
        { error: e, namespace: Namespaces.AUTH.NAMESPACE_RECOVER_TOKEN_VERIFY },
        { root: true }
      );
    }
  },

  async refreshAccessToken({ commit }) {
    const response = await API_AUTH.refreshAccessToken();
    commit("SET_TOKEN", `${response.data.type} ${response.data.token}`, {
      root: true,
    });
  },

  async verifyUser({ dispatch }, verifyToken: string) {
    try {
      await API_AUTH.verifyUser(verifyToken);
      dispatch(
        "updateAlerts",
        {
          type: "success",
          message: "Success",
          description: "Your account successfully confirmed!",
          showIcon: true,
          iconName: AlertIcons.SUCCESS_ICON,
        },
        { root: true }
      );
    } catch (e) {
      dispatch(
        "updateErrors",
        { error: e, namespace: Namespaces.AUTH.NAMESPACE_VERIFY_USER },
        { root: true }
      );
    }
  },
};

export default AuthActions;
