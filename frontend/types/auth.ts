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

export interface FormProps {
  title: string;
  subtitle: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: JSX.Element | Array<JSX.Element>;
}

export interface LoginFormData {
  email: string;
  password: string;
  showPassword: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  verifyPassword: string;
  showPassword: boolean;
  showVerifyPassword: boolean;
  otp: string;
  token: string;
}
