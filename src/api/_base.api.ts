import axios, { AxiosRequestHeaders, AxiosResponse, Method } from "axios";
import store from "@/store";

export class _BaseApi {
  private readonly _baseUrl: string;
  private _prefix = "api/";

  constructor() {
    this._baseUrl = process.env.VUE_APP_API_URL;
  }
  protected async executeRequest(
    route: string,
    method: Method,
    hasPrefix?: boolean,
    data?: unknown,
    params?: unknown,
    headers?: AxiosRequestHeaders
  ): Promise<AxiosResponse> {
    const url = hasPrefix
      ? this._baseUrl + this._prefix + route
      : this._baseUrl + route;

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
