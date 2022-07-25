import { IUserInfo, IUsersState } from "@/store/modules/users/users.types";
import { MutationTree } from "vuex";

const UserMutations: MutationTree<IUsersState> = {
  UPDATE_SEARCHED_USERS(state: IUsersState, searchedUsers: IUserInfo[]) {
    state.searchedUsers = searchedUsers;
  },
  UPDATE_USER_INFO(state: IUsersState, userInfo: IUserInfo) {
    state.userInfo = userInfo;
  },
};

export default UserMutations;
