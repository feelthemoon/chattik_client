import { IUserInfo, IUsersState } from "@/store/modules/users/users.types";
import { MutationTree } from "vuex";

const UserMutations: MutationTree<IUsersState> = {
  UPDATE_SEARCHED_USERS(state: IUsersState, searchedUsers: IUserInfo[]) {
    state.searchedUsers = searchedUsers;
  },
};

export default UserMutations;
