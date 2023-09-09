"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

import { toast } from "react-toastify";
import { BiKey, BiLock } from "react-icons/bi";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const FormWrapper = dynamic(() => import("@/src/components/ui/FormWrapper"));
const ErrorField = dynamic(() => import("@/src/components/ui/ErrorField"));

import { resetPassowrd } from "@/src/http";

import { ResetPasswordFormData } from "@/src/types/auth";
import { getResetPasswordErrors } from "@/src/utils/errors";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ResetPasswordFormData>(
    {} as ResetPasswordFormData
  );

  useEffect(() => {
    async function getToken() {
      const token = searchParams.get("token");

      if (!token) {
        toast.error("Invalid reset password request.");
        router.push("/login");
        return;
      }

      setFormData({ ...formData, token });
    }

    getToken();
  }, [router, searchParams]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name: string = e.target.name;
    const value: string = e.target.value;

    setFormData({ ...formData, [name]: value });

    let password: string;
    let confirmPassword: string;

    switch (name) {
      case "password":
        password = value;
        confirmPassword = formData.confirmPassword;
        break;

      case "confirmPassword":
        password = formData.password;
        confirmPassword = value;
        break;

      default:
        password = formData.password;
        confirmPassword = formData.confirmPassword;
    }

    const errorMessage = getResetPasswordErrors(password, confirmPassword);

    setError(errorMessage);
  }

  function setShowPassword(name: string) {
    setFormData({ ...formData, [name]: !formData[name] });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const errorMessage = getResetPasswordErrors(
      formData.password,
      formData.confirmPassword
    );

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    try {
      await resetPassowrd({
        password: formData.password,
        token: formData.token,
      });
      toast.success("Password reset successfully.");
      router.push("/login");
    } catch (err) {
      toast.error("Something went wrong.");
      router.push("/login");
    }
  }

  return (
    <FormWrapper
      title="Reset Password"
      subtitle="Reset password to manage your account"
      buttonText="Submit"
      onSubmit={onSubmit}
    >
      <div className="flex w-full flex-col gap-3">
        <div className="relative h-full w-full">
          <BiKey className="absolute left-2 top-[9px] text-2xl text-gray-400" />
          <input
            name="password"
            type={formData.showPassword ? "text" : "password"}
            value={formData.password}
            placeholder="Enter password"
            className="h-full w-full rounded border-[1px] px-9 py-[10px] text-gray-500 outline-none placeholder:text-sm focus:border-[#28282B]"
            onChange={onChange}
          />
          {formData.showPassword ? (
            <MdVisibility
              name="showPassword"
              onClick={() => setShowPassword("showPassword")}
              className="absolute right-2 top-3 cursor-pointer text-xl text-gray-400"
            />
          ) : (
            <MdVisibilityOff
              name="showPassword"
              onClick={() => setShowPassword("showPassword")}
              className="absolute right-2 top-3 cursor-pointer text-xl text-gray-400"
            />
          )}
        </div>

        <div className="relative h-full w-full">
          <BiLock className="absolute left-2 top-3 text-xl text-gray-400" />
          <input
            name="confirmPassword"
            type={formData.showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            placeholder="Confirm password"
            className="h-full w-full rounded border-[1px] px-9 py-[10px] text-gray-500 outline-none placeholder:text-sm focus:border-[#28282B]"
            onChange={onChange}
          />
          {formData.showConfirmPassword ? (
            <MdVisibility
              name="showConfirmPassword"
              onClick={() => setShowPassword("showConfirmPassword")}
              className="absolute right-2 top-3 cursor-pointer text-xl text-gray-400"
            />
          ) : (
            <MdVisibilityOff
              name="showConfirmPassword"
              onClick={() => setShowPassword("showConfirmPassword")}
              className="absolute right-2 top-3 cursor-pointer text-xl text-gray-400"
            />
          )}
        </div>

        <ErrorField error={error} />
      </div>
    </FormWrapper>
  );
}
