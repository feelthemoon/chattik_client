import axios, { AxiosRequestHeaders, AxiosResponse, Method } from "axios";
import store from "@/store";

export class _BaseApi {
  private readonly _baseUrl: string;
  private readonly _prefix = "api/";

  constructor(customPrefix: string) {
    this._baseUrl = process.env.VUE_APP_API_URL;
    this._prefix += customPrefix + "/";
  }
  protected async executeRequest(
    route: string,
    method: Method,
    data?: unknown,
    params?: unknown,
    headers?: AxiosRequestHeaders
  ): Promise<AxiosResponse> {
    const url = this._baseUrl + this._prefix + route;

    store.commit("CLEAR_ERRORS");

    const response = await axios.request({
      url,
      method,
      headers,
      data,
      params,
      withCredentials: true,
    });
    if (response.headers.authorization) {
      store.commit("SET_TOKEN", response.headers.authorization);
    }
    return response;
  }
}
