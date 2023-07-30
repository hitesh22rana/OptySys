"use client";

import { MdOutlineEmail } from "react-icons/md";

import FormWrapper from "@/src/components/common/FormWrapper";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(email);

    console.log("forgot password");
  }

  return (
    <FormWrapper
      title="Forgot Password"
      subtitle="Enter your email address and we'll send you a link to reset your password"
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
      </div>
    </FormWrapper>
  );
}
