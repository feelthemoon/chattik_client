import { _BaseApi } from "@/api/_base.api";
import { AxiosResponse } from "axios";
import { INewPasswordData } from "@/store/modules/users/users.types";

class _UsersApi extends _BaseApi {
  constructor() {
    super("users");
  }
  createNewPassword(
    data: INewPasswordData,
    recoverToken: string
  ): Promise<AxiosResponse> {
    return this.executeRequest("new-password", "PUT", data, {
      token: recoverToken,
    });
  }

  searchUsers(username: string, accessToken: string): Promise<AxiosResponse> {
    return this.executeRequest(
      "search",
      "GET",
      null,
      {
        s: username,
      },
      { Authorization: accessToken }
    );
  }

  getMe(accessToken: string): Promise<AxiosResponse> {
    return this.executeRequest("me", "GET", null, null, {
      Authorization: accessToken,
    });
  }
}

export default new _UsersApi();
