import { _BaseApi } from "@/api/_base.api";
import { AxiosResponse } from "axios";
import { INewPasswordData } from "@/store/modules/users/users.types";

class _UsersApi extends _BaseApi {
  constructor() {
    super();
  }
  createNewPassword(
    data: INewPasswordData,
    recoverToken: string
  ): Promise<AxiosResponse> {
    return this.executeRequest("users/new-password", "PUT", true, data, {
      token: recoverToken,
    });
  }

  searchUsers(username: string, accessToken: string): Promise<AxiosResponse> {
    return this.executeRequest(
      "users/search",
      "GET",
      true,
      null,
      {
        s: username,
      },
      { Authorization: accessToken }
    );
  }

  getMe(accessToken: string): Promise<AxiosResponse> {
    return this.executeRequest("users/me", "GET", true, null, null, {
      Authorization: accessToken,
    });
  }
}

export default new _UsersApi();
