"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { MdOutlineEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { BiKey } from "react-icons/bi";

import FormWrapper from "@/src/components/ui/FormWrapper";
import InputField from "@/src/components/ui/InputField";
import ErrorField from "@/src/components/ui/ErrorField";

import { login } from "@/src/http";

import { LoginFormData } from "@/src/types/auth";
import { LoginFormProps } from "@/src/types/common";

import { getLoginFormErrors } from "@/src/utils/errors";

export default function Login({ toggleForgotPassword }: LoginFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({} as LoginFormData);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name: string = e.target.name;
    const value: string = e.target.value;

    setFormData({ ...formData, [name]: value });

    let email: string;
    let password: string;

    switch (name) {
      case "email":
        email = value;
        password = formData.password;
        break;

      case "password":
        email = formData.email;
        password = value;
        break;

      default:
        email = formData.email;
        password = formData.password;
    }

    const errorMessage = getLoginFormErrors(email, password);

    setError(errorMessage);
    setDisabled(errorMessage !== null);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // checks for formdata
    const errorMessage = getLoginFormErrors(formData.email, formData.password);

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    try {
      await login(formData);
      toast.success("Successfully logged in.");
      router.push("/dashboard");
    } catch (err: AxiosError | any) {
      toast.error("Invalid credentials.");
    }
  }

  function setShowPassword(name: string) {
    setFormData({ ...formData, [name]: !formData[name] });
  }

  return (
    <FormWrapper
      title="Login"
      subtitle="Login to manage your account"
      buttonText="Login"
      disabled={disabled}
      onSubmit={onSubmit}
    >
      <section className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-col gap-4">
          <InputField
            name="email"
            type="email"
            value={formData.email}
            placeholder="Enter email"
            onChange={onChange}
            IconLeft={MdOutlineEmail}
          />

          <InputField
            name="password"
            type={formData.showPassword ? "text" : "password"}
            value={formData.password}
            placeholder="Enter password"
            onChange={onChange}
            IconLeft={BiKey}
            IconRight={formData.showPassword ? MdVisibility : MdVisibilityOff}
            onRightIconClick={() => setShowPassword("showPassword")}
          />
        </div>

        <div className="flex w-full flex-row items-center justify-between">
          <ErrorField error={error} />
          <button
            type="button"
            onClick={toggleForgotPassword}
            className="h-2 text-sm text-blue-500 underline underline-offset-2"
          >
            Forgot password?
          </button>
        </div>
      </section>

      <div className="absolute -bottom-10 left-0 right-0 flex w-full flex-col items-center justify-start gap-4 text-gray-500">
        <div className="flex flex-row gap-2 text-sm">
          <span>Don&apos;t have an account?</span>
          <Link
            href="/register"
            className="text-blue-500 underline underline-offset-2"
          >
            Register
          </Link>
        </div>
      </div>
    </FormWrapper>
  );
}
