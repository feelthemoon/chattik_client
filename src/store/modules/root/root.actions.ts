import { ActionTree } from "vuex";
import {
  ILoading,
  IRootState,
  Namespaces,
} from "@/store/modules/root/root.types";
import { AxiosError } from "axios";

const RootActions: ActionTree<IRootState, IRootState> = {
  updateErrors(
    { commit },
    { error, namespace }: { error: unknown; namespace: Namespaces }
  ): void {
    if (error instanceof AxiosError) {
      commit("UPDATE_ERRORS", {
        namespace,
        statusCode: error.response?.status,
        message: error.response?.data?.message ?? "Unknown Error",
      });
    } else {
      console.error(error);
    }
  },
  updateLoading({ commit }, loading: ILoading): void {
    commit("UPDATE_LOADING", loading);
  },
};

export default RootActions;
