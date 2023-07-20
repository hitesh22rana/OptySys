import { JSX } from "react";

export interface FormData {
  email: string;
  password: string;
}
export interface SignupFormData {
  email: string;
  password: string;
  verify_password:string
}
export interface WrapperProps {
  children: string | JSX.Element | Array<JSX.Element> | React.ReactNode;
}
