import { ActionTree } from "vuex";
import {
  AlertIcons,
  IRootState,
  Namespaces,
} from "@/store/modules/root/root.types";
import {
  INewPasswordData,
  IUsersState,
} from "@/store/modules/users/users.types";
import { API_USERS } from "@/api";

const UsersActions: ActionTree<IUsersState, IRootState> = {
  async createNewPassword(
    { dispatch },
    request: { data: INewPasswordData; recoverToken: string }
  ) {
    try {
      dispatch(
        "updateLoading",
        { namespace: Namespaces.USER_NAMESPACE_NEW_PASSWORD, loading: true },
        { root: true }
      );
      await API_USERS.createNewPassword(request.data, request.recoverToken);
      dispatch(
        "updateAlerts",
        {
          type: "success",
          message: "Success",
          description: "Your password has been successfully updated",
          showIcon: true,
          iconName: AlertIcons.SUCCESS_ICON,
        },
        { root: true }
      );
    } catch (e) {
      dispatch(
        "updateErrors",
        { error: e, namespace: Namespaces.USER_NAMESPACE_NEW_PASSWORD },
        { root: true }
      );
    } finally {
      dispatch(
        "updateLoading",
        { namespace: Namespaces.USER_NAMESPACE_NEW_PASSWORD, loading: false },
        { root: true }
      );
    }
  },
};

export default UsersActions;
