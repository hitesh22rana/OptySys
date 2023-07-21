import { RegisterFormData } from "./auth";

export interface WrapperProps {
  children: string | JSX.Element | Array<JSX.Element> | React.ReactNode;
}

export interface RegisterFormProps {
  formData: RegisterFormData;
  setShowPassword: (value: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}
