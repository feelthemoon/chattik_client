import { IUserInfo, IUsersState } from "@/store/modules/users/users.types";
import { IRootState } from "@/store/modules/root/root.types";
import { GetterTree } from "vuex";

const UsersGetters: GetterTree<IUsersState, IRootState> = {
  searchedUsers: (state) =>
    state.searchedUsers.map((user: IUserInfo) => ({
      ...user,
      value: user.username,
    })),
};

export default UsersGetters;
