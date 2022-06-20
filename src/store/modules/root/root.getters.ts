import { IError, IRootState } from "@/store/modules/root/root.types";
import { GetterTree } from "vuex";

const RootGetters: GetterTree<IRootState, IRootState> = {
  token: (state: IRootState) => state.token,
  loadingByNamespace: (state: IRootState) => (namespace: string) =>
    state.loading.find((l) => l.namespace === namespace)?.loading,
  errorByNamespace:
    (state: IRootState) =>
    (namespace: string): IError | undefined =>
      state.errors.find((e) => e.namespace === namespace),
};

export default RootGetters;