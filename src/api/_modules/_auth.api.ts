import { _BaseApi } from "@/api/_base.api";
import { AxiosResponse } from "axios";
import { ISigninData, ISignupData } from "@/store/modules/auth/auth.types";

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
}

export default new _AuthApi();
