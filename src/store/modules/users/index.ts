import { Module } from "vuex";
import { IRootState } from "@/store/modules/root/root.types";
import { IUsersState } from "@/store/modules/users/users.types";
import actions from "@/store/modules/users/users.actions";
import mutations from "@/store/modules/users/users.mutations";
import getters from "@/store/modules/users/users.getters";
import state from "@/store/modules/users/users.state";

const UsersModule: Module<IUsersState, IRootState> = {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
};

export default UsersModule;
