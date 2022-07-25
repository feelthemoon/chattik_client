export abstract class Namespaces {
  static readonly AUTH = {
    NAMESPACE_SIGNIN: "signin_namespace",
    NAMESPACE_SIGNUP: "signup_namespace",
    NAMESPACE_LOGOUT: "logout_namespace",
    NAMESPACE_RECOVER: "recover_namespace",
    NAMESPACE_RECOVER_TOKEN_VERIFY: "recover_token_verify_namespace",
    NAMESPACE_REFRESH_ACCESS_TOKEN: "refresh_access_token_namespace",
    NAMESPACE_VERIFY_USER: "verify_user_namespace",
  };
  static readonly USER = {
    NAMESPACE_NEW_PASSWORD: "new_password_namespace",
    NAMESPACE_SEARCH: "search_namespace",
    NAMESPACE_ME: "my_info_namespace",
  };
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
  duration?: number;
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
