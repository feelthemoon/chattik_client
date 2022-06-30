import { _BaseApi } from "@/api/_base.api";
import { AxiosResponse } from "axios";
import {
  IRecoverData,
  ISigninData,
  ISignupData,
} from "@/store/modules/auth/auth.types";

class _AuthApi extends _BaseApi {
  constructor() {
    super();
  }

  public signin(data: ISigninData): Promise<AxiosResponse> {
    return this.executeRequest("auth/signin", "POST", true, data);
  }

  public signup(data: ISignupData): Promise<AxiosResponse> {
    return this.executeRequest("auth/signup", "POST", true, data);
  }

  public refreshAccessToken(): Promise<AxiosResponse> {
    return this.executeRequest("auth/refresh", "POST", true);
  }

  public logout(accessToken: string): Promise<AxiosResponse> {
    return this.executeRequest("auth/logout", "POST", true, null, null, {
      authorization: accessToken,
    });
  }

  public recoverPassword(data: IRecoverData): Promise<AxiosResponse> {
    return this.executeRequest("auth/recover", "POST", true, data);
  }

  public verifyRecoverToken(recoverToken: string): Promise<AxiosResponse> {
    return this.executeRequest("auth/verify-recover", "GET", true, null, {
      token: recoverToken,
    });
  }
}

export default new _AuthApi();
