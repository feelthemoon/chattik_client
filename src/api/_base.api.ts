import axios, { AxiosRequestHeaders, AxiosResponse, Method } from "axios";

export class _BaseApi {
  private readonly _baseUrl: string;
  private _prefix = "api/";

  constructor() {
    this._baseUrl = process.env.VUE_APP_API_URL;
  }
  protected executeRequest(
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

    return axios.request({
      url,
      method,
      headers,
      data,
      params,
      withCredentials: true,
    });
  }
}
