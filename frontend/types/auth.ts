import { Experience, Social } from "./user";

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
  buttonText: string;

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
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  token: string;
}

export interface DetailsFormData {
  summary: string;
  socials: Array<Social>;
  experiences: Array<Experience>;
  skills: Array<string>;
  achievements: Array<string>;
}

export interface DetailStep {
  onNext(): void;
}

export interface DetailsStep {
  [key: number]: ({ onNext }: DetailStep) => JSX.Element;
}
