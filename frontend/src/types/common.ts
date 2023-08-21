import { IconType } from "react-icons/lib";

import { RegisterFormData } from "@/src/types/auth";

export interface WrapperProps {
  children: string | JSX.Element | Array<JSX.Element> | React.ReactNode;
}

export interface SectionWrapperProps {
  heading: string;
  subHeading?: string;
  children: string | JSX.Element | Array<JSX.Element> | React.ReactNode;
}

export interface LoginFormProps {
  toggleForgotPassword: () => void;
}

export interface forgotPasswordFormProps {
  toggleForgotPassword: () => void;
}

export interface RegisterFormProps {
  formData: RegisterFormData;
  setShowPassword: (value: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  disabled: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export interface VerifyFormProps {
  resendOTP: () => Promise<void>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, otp: string) => Promise<void>;
}

export interface DropdownMenuProps {
  className: string;
  children: string | JSX.Element | Array<JSX.Element> | React.ReactNode;
}

export interface IconProps {
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: string | JSX.Element | Array<JSX.Element> | React.ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  children: string | JSX.Element | Array<JSX.Element> | React.ReactNode;
}

export interface AlertDialogProps {
  isOpen: boolean;
  children: string | JSX.Element | Array<JSX.Element> | React.ReactNode;
}

export interface IOption {
  label: string;
  value: string;
}

export interface IJsonNotification {
  id: string;
  data: any;
}

export interface IRoute {
  name: string;
  icon: IconType;
  path: string;
  color: string;
}

export interface ICardData {
  name: string;
  icon: IconType;
  path: string;
  cardBackground: string;
  iconColor: string;
  iconBackground: string;
  cardShadow: string;
}
