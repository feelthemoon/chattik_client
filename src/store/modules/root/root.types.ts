export enum Namespaces {
  AUTH_NAMESPACE_SIGNIN = "signin_namespace",
  AUTH_NAMESPACE_SIGNUP = "signup_namespace",
}

export interface ILoading {
  namespace: Namespaces;
  loading: boolean;
}
export interface IError {
  id: number;
  namespace: Namespaces;
  statusCode: number;
  message: string;
}
export interface IRootState {
  token: string;
  loading: Array<ILoading>;
  errors: Array<IError>;
}
