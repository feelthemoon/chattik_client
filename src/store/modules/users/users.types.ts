export interface IUserInfo {
  id: number;
  email: string;
  username: string;
  name: string;
  avatar: string;
  confirmed: boolean;
  dialogs?: [];
  messages?: [];
  lastSeen: Date;
  createdAt: Date;
}

export interface IUsersState {
  userInfo: IUserInfo | unknown;
  searchedUsers: Array<IUserInfo>;
}

export interface INewPasswordData {
  newPassword: string;
  passwordConfirm: string;
  recaptchaToken: string;
}
