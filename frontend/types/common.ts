import { JSX } from "react";

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

export interface WrapperProps {
  children: string | JSX.Element | Array<JSX.Element> | React.ReactNode;
}
