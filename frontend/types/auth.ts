interface UserDetailsData {
  email: string;
  password: string;
  name: string;
}

export interface RegisterData {
  email: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface VerifyData {
  user_details: UserDetailsData;
  otp: string;
  token: string;
}
