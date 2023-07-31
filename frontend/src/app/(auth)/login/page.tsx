"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { MdOutlineEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { BiKey } from "react-icons/bi";

import FormWrapper from "@/src/components/common/FormWrapper";
import ErrorField from "@/src/components/common/ErrorField";

import { LoginFormData } from "@/src/types/auth";
import { login } from "@/src/http";

import { getLoginFormErrors } from "@/src/utils/errors";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({} as LoginFormData);
  const [error, setError] = useState<string | null>(null);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name: string = e.target.name;
    const value: string = e.target.value;

    setFormData({ ...formData, [name]: value });

    let email;
    let password;

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
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-3 w-full">
        <div className="relative w-full h-full">
          <MdOutlineEmail className="absolute text-xl top-3 left-2 text-gray-400" />
          <input
            name="email"
            type="email"
            value={formData.email}
            placeholder="Enter email"
            className="outline-none border-[1px] px-9 py-[10px] rounded focus:border-[#28282B] w-full h-full text-gray-500 placeholder:text-sm"
            onChange={onChange}
          />
        </div>

        <div className="relative w-full h-full">
          <BiKey className="absolute text-2xl top-[9px] left-2 text-gray-400" />
          <input
            name="password"
            type={formData.showPassword ? "text" : "password"}
            value={formData.password}
            placeholder="Enter password"
            className="outline-none border-[1px] px-9 py-[10px] rounded focus:border-[#28282B] w-full h-full text-gray-500 placeholder:text-sm"
            onChange={onChange}
          />
          {formData.showPassword ? (
            <MdVisibility
              name="showPassword"
              onClick={() => setShowPassword("showPassword")}
              className="cursor-pointer absolute text-xl top-3 right-2 text-gray-400"
            />
          ) : (
            <MdVisibilityOff
              name="showPassword"
              onClick={() => setShowPassword("showPassword")}
              className="cursor-pointer absolute text-xl top-3 right-2 text-gray-400"
            />
          )}
        </div>

        <div className="flex flex-row items-center justify-between w-full">
          <ErrorField error={error} />
          <Link
            href="/reset-password"
            className="text-blue-500 underline underline-offset-2 text-sm h-2"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <div className="text-gray-500 absolute -bottom-10 left-0 right-0 flex flex-col items-center justify-start gap-4 w-full">
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
