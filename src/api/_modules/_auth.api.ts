import { _BaseApi } from "@/api/_base.api";
import { AxiosResponse } from "axios";
import {
  IRecoverData,
  ISigninData,
  ISignupData,
} from "@/store/modules/auth/auth.types";

class _AuthApi extends _BaseApi {
  constructor() {
    super("auth");
  }

  public signin(data: ISigninData): Promise<AxiosResponse> {
    return this.executeRequest("signin", "POST", data);
  }

  public signup(data: ISignupData): Promise<AxiosResponse> {
    return this.executeRequest("signup", "POST", data);
  }

  public refreshAccessToken(): Promise<AxiosResponse> {
    return this.executeRequest("refresh", "POST");
  }

  public logout(accessToken: string): Promise<AxiosResponse> {
    return this.executeRequest("logout", "POST", null, null, {
      authorization: accessToken,
    });
  }

  public recoverPassword(data: IRecoverData): Promise<AxiosResponse> {
    return this.executeRequest("recover", "POST", data);
  }

  public verifyRecoverToken(recoverToken: string): Promise<AxiosResponse> {
    return this.executeRequest("verify-recover", "GET", null, {
      token: recoverToken,
    });
  }

  public verifyUser(verifyToken: string): Promise<AxiosResponse> {
    return this.executeRequest("verify", "POST", null, {
      token: verifyToken,
    });
  }
}

export default new _AuthApi();
