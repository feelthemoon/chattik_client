import { _BaseApi } from "@/api/_base.api";
import { AxiosResponse } from "axios";
import { ISigninData, ISignupData } from "@/store/modules/auth/auth.types";

class _AuthApi extends _BaseApi {
  constructor() {
    super();
  }

  public signin(data: ISigninData): Promise<AxiosResponse> {
    return this.executeRequest("signin", "POST", false, data);
  }

  public signup(data: ISignupData): Promise<AxiosResponse> {
    return this.executeRequest("signup", "POST", false, data);
  }
}

export default new _AuthApi();
