import { RegisterFormData } from "./auth";

export interface WrapperProps {
  children: string | JSX.Element | Array<JSX.Element> | React.ReactNode;
}

export interface RegisterFormProps {
  error: string | null;
  formData: RegisterFormData;
  setShowPassword: (value: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export interface VerifyFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>, otp: string) => Promise<void>;
}

export interface DropdownMenuProps {
  className: string;
  children: string | JSX.Element | Array<JSX.Element> | React.ReactNode;
}

export interface IconProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: string | JSX.Element | Array<JSX.Element> | React.ReactNode;
}
