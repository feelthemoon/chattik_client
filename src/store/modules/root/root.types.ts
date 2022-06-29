export enum Namespaces {
  AUTH_NAMESPACE_SIGNIN = "signin_namespace",
  AUTH_NAMESPACE_SIGNUP = "signup_namespace",
  AUTH_NAMESPACE_LOGOUT = "logout_namespace",
  AUTH_NAMESPACE_RECOVER = "recover_namespace",
}

export enum AlertIcons {
  SUCCESS_ICON = "smile-outlined",
  ERROR_ICON_COMMON = "frown-outlined",
  ERROR_ICON_CAPTCHA = "robot-outlined",
}

export interface IAPIError {
  type: string;
  text: string;
}

export interface ILoading {
  namespace: Namespaces;
  loading: boolean;
}
export interface IAlert {
  id: number;
  message: string;
  description: string;
  type: string;
  showIcon?: boolean;
  iconName?: AlertIcons;
}
export interface IError {
  id: number;
  namespace: Namespaces;
  statusCode: number;
  message: Array<IAPIError>;
}
export interface IRootState {
  token: string;
  loading: Array<ILoading>;
  errors: Array<IError>;
  alerts: Array<IAlert>;
}
