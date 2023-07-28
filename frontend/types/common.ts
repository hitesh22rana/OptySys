import { RegisterFormData } from "@/types/auth";

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
