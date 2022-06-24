export interface ISigninData {
  email: string;
  password: string;
  recaptchaToken: string;
}

export interface ISignupData extends ISigninData {
  username: string;
}

export interface IRecoverData {
  email: string;
  recaptchaToken: string;
}
