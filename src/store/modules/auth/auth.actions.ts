import { ActionTree } from "vuex";
import { IRootState, Namespaces } from "@/store/modules/root/root.types";
import { ISigninData, ISignupData } from "@/store/modules/auth/auth.types";
import { API_AUTH } from "@/api";

const AuthActions: ActionTree<unknown, IRootState> = {
  async signin({ dispatch, commit }, data: ISigninData) {
    try {
      dispatch(
        "updateLoading",
        { namespace: Namespaces.AUTH_NAMESPACE_SIGNIN, loading: true },
        { root: true }
      );
      const res = await API_AUTH.signin(data);
      commit("SET_TOKEN", res.headers.authorization, { root: true });
    } catch (e: unknown) {
      dispatch(
        "updateErrors",
        { error: e, namespace: Namespaces.AUTH_NAMESPACE_SIGNIN },
        { root: true }
      );
    } finally {
      dispatch(
        "updateLoading",
        { namespace: Namespaces.AUTH_NAMESPACE_SIGNIN, loading: false },
        { root: true }
      );
    }
  },

  async signup({ dispatch, commit }, data: ISignupData) {
    try {
      dispatch(
        "updateLoading",
        { namespace: Namespaces.AUTH_NAMESPACE_SIGNUP, loading: true },
        { root: true }
      );
      const res = await API_AUTH.signup(data);
      commit("SET_TOKEN", res.headers.authorization, { root: true });
    } catch (e: unknown) {
      dispatch(
        "updateErrors",
        { error: e, namespace: Namespaces.AUTH_NAMESPACE_SIGNUP },
        { root: true }
      );
    } finally {
      dispatch(
        "updateLoading",
        { namespace: Namespaces.AUTH_NAMESPACE_SIGNUP, loading: false },
        { root: true }
      );
    }
  },

  async logout({ dispatch, rootGetters }) {
    try {
      dispatch(
        "updateLoading",
        { namespace: Namespaces.AUTH_NAMESPACE_LOGOUT, loading: true },
        { root: true }
      );
      await API_AUTH.logout(rootGetters.token);
    } catch (e: unknown) {
      dispatch(
        "updateErrors",
        { error: e, namespace: Namespaces.AUTH_NAMESPACE_LOGOUT },
        { root: true }
      );
    } finally {
      dispatch(
        "updateLoading",
        { namespace: Namespaces.AUTH_NAMESPACE_LOGOUT, loading: false },
        { root: true }
      );
    }
  },

  async recover({ dispatch }, email: string) {
    try {
      dispatch(
        "updateLoading",
        { namespace: Namespaces.AUTH_NAMESPACE_RECOVER, loading: true },
        { root: true }
      );
      await API_AUTH.recoverPassword(email);
    } catch (e: unknown) {
      dispatch(
        "updateErrors",
        { error: e, namespace: Namespaces.AUTH_NAMESPACE_RECOVER },
        { root: true }
      );
    } finally {
      dispatch(
        "updateLoading",
        { namespace: Namespaces.AUTH_NAMESPACE_RECOVER, loading: false },
        { root: true }
      );
    }
  },
};

export default AuthActions;
