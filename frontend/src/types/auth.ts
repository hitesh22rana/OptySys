import { Experience, Social } from "@/src/types/user";

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

export interface forgotPasswordData {
  email: string;
}

export interface resetPasswordData {
  password: string;
  token: string;
}

export interface FormProps {
  title: string;
  subtitle: string;
  buttonText: string;
  disabled?: boolean;
  className?: string;

  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;

  children: JSX.Element | Array<JSX.Element>;
}

export interface LoginFormData {
  email: string;
  password: string;
  showPassword: boolean;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  token: string;
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
  skills: Array<string>;
  experiences: Array<Experience>;
  achievements: Array<string>;
}

export interface DetailStepProps {
  onNext(e: React.FormEvent<HTMLFormElement>): void;
}

export interface DetailsStep {
  [key: number]: ({ onNext }: DetailStepProps) => JSX.Element;
}

export interface SocialMap {
  name: string;
  text: string;
  value: string | undefined;
  placeholder: string;
}
