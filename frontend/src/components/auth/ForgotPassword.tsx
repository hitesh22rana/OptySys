"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { MdOutlineEmail } from "react-icons/md";

const FormWrapper = dynamic(
  () => import("@/src/components/common/FormWrapper")
);

import { forgotPassword } from "@/src/http";

import { forgotPasswordFormProps } from "@/src/types/common";

import { getForgotPasswordErrors } from "@/src/utils/errors";

export default function ForgotPassword({
  toggleForgotPassword,
}: forgotPasswordFormProps) {
  const [email, setEmail] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // checks for formdata
    const errorMessage = getForgotPasswordErrors(email);

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    try {
      await forgotPassword({ email: email });
      toast.success("Successfully sent link.");
      toggleForgotPassword();
    } catch (err: AxiosError | any) {
      toast.error("Unable to send link.");
    }
  }

  return (
    <FormWrapper
      title="Forgot Password"
      subtitle="Enter your registered email address to reset your password."
      buttonText="Submit"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-3 w-full">
        <div className="relative w-full h-full">
          <MdOutlineEmail className="absolute text-xl top-3 left-2 text-gray-400" />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none border-[1px] px-9 py-[10px] rounded focus:border-[#28282B] w-full h-full text-gray-500 placeholder:text-sm"
          />
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
      </div>
    </FormWrapper>
  );
}
