import { IError, ILoading, IRootState } from "@/store/modules/root/root.types";
import { MutationTree } from "vuex";

const RootMutations: MutationTree<IRootState> = {
  SET_TOKEN(state: IRootState, token: string) {
    state.token = token;
  },
  UPDATE_LOADING(state: IRootState, loading: ILoading) {
    const foundLoadingNamespace = state.loading.find(
      (l) => l.namespace === loading.namespace
    );
    if (foundLoadingNamespace) {
      foundLoadingNamespace.loading = loading.loading;
    } else {
      state.loading.push(loading);
    }
  },
  UPDATE_ERRORS(state: IRootState, error: IError) {
    const errorId = state.errors[state.errors.length - 1]?.id ?? 0;
    state.errors.push({ ...error, id: errorId + 1 });
  },
  DELETE_ERROR(state: IRootState, error: IError) {
    state.errors.splice(
      state.errors.findIndex((e) => e.id === error.id),
      1
    );
  },
};

export default RootMutations;
