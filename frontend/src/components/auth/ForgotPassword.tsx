"use client";

import { useState } from "react";
import Link from "next/link";

import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { MdOutlineEmail } from "react-icons/md";

import FormWrapper from "@/src/components/ui/FormWrapper";
import InputField from "@/src/components/ui/InputField";
import ErrorField from "@/src/components/ui/ErrorField";

import { forgotPassword } from "@/src/http";

import { forgotPasswordFormProps } from "@/src/types/common";

import { getForgotPasswordErrors } from "@/src/utils/errors";

export default function ForgotPassword({
  toggleForgotPassword,
}: forgotPasswordFormProps) {
  const [email, setEmail] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value: string = e.target.value;

    setEmail(value);

    const errorMessage = getForgotPasswordErrors(value);

    setError(errorMessage);
    setDisabled(errorMessage !== null);
  }

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
      disabled={disabled}
      onSubmit={onSubmit}
    >
      <section className="flex w-full flex-col gap-3">
        <InputField
          name="email"
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={onChange}
          IconLeft={MdOutlineEmail}
        />

        <ErrorField error={error} />

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
      </section>
    </FormWrapper>
  );
}
