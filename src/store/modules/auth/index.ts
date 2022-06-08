import { Module } from "vuex";
import { IRootState } from "@/store/modules/root/root.types";

import actions from "@/store/modules/auth/auth.actions";

const AuthModule: Module<unknown, IRootState> = {
  namespaced: true,
  actions,
};

export default AuthModule;
