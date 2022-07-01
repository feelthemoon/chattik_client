import { ActionTree } from "vuex";
import {
  AlertIcons,
  IAlert,
  IAPIError,
  ILoading,
  IRootState,
  Namespaces,
} from "@/store/modules/root/root.types";
import { AxiosError } from "axios";

const RootActions: ActionTree<IRootState, IRootState> = {
  updateErrors(
    { commit, dispatch },
    { error, namespace }: { error: unknown; namespace: Namespaces }
  ): void {
    if (
      error instanceof AxiosError &&
      Array.isArray(error.response?.data.message)
    ) {
      commit("UPDATE_ERRORS", {
        namespace,
        statusCode: error.response?.status,
        message: error.response?.data?.message ?? "Unknown Error",
      });

      const messages: IAPIError[] = error.response?.data.message.filter(
        (message: IAPIError) =>
          message.type === "common_error" || message.type === "captcha_error"
      );

      if (messages.length > 0) {
        messages.forEach((message) => {
          dispatch("updateAlerts", {
            type: "error",
            message:
              message.type === "common_error"
                ? "Error"
                : "Captcha Error. Are you robot?",
            description: message.text,
            showIcon: true,
            iconName:
              message.type === "common_error"
                ? AlertIcons.ERROR_ICON_COMMON
                : AlertIcons.ERROR_ICON_CAPTCHA,
          });
        });
      }
    } else {
      dispatch("updateAlerts", {
        type: "error",
        message: "Error",
        description: "Unknown Error",
        showIcon: true,
        iconName: AlertIcons.ERROR_ICON_COMMON,
      });
    }
  },
  updateLoading({ commit }, loading: ILoading): void {
    commit("UPDATE_LOADING", loading);
  },
  updateAlerts({ commit, state }, alert: IAlert): number {
    const alertId = state.alerts[state.alerts.length - 1]?.id ?? 0;
    commit("UPDATE_ALERTS", { ...alert, id: alertId + 1 });
    return setTimeout(
      () => commit("REMOVE_ALERT", alertId + 1),
      alert.duration ?? 3000
    );
  },
};

export default RootActions;
