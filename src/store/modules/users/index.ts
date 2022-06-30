import { Module } from "vuex";
import { IRootState } from "@/store/modules/root/root.types";
import { IUsersState } from "@/store/modules/users/users.types";
import actions from "@/store/modules/users/users.actions";

const UsersModule: Module<IUsersState, IRootState> = {
  namespaced: true,
  actions,
};

export default UsersModule;
