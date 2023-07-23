import Link from "next/link";

import { MdOutlineEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { BiUser, BiKey, BiLock } from "react-icons/bi";

import FormWrapper from "../common/FormWrapper";

import { RegisterFormProps } from "@/types/common";

export default function Register({
  error,
  formData,
  setShowPassword,
  onChange,
  onSubmit,
}: RegisterFormProps) {
  return (
    <FormWrapper
      title="Register"
      subtitle="Create your account and let the fun begin!"
      buttonText="Register"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-[10px] w-full">
        <div className="relative w-full h-full">
          <BiUser className="absolute text-xl top-3 left-2 text-gray-400" />
          <input
            name="name"
            type="text"
            value={formData.name}
            placeholder="Enter name"
            className="outline-none border-[1px] px-9 py-[10px] rounded focus:border-blue-500 w-full h-full text-gray-500 placeholder:text-sm"
            onChange={onChange}
          />
        </div>

        <div className="relative w-full h-full">
          <MdOutlineEmail className="absolute text-xl top-3 left-2 text-gray-400" />
          <input
            name="email"
            type="email"
            value={formData.email}
            placeholder="Enter email"
            className="outline-none border-[1px] px-9 py-[10px] rounded focus:border-blue-500 w-full h-full text-gray-500 placeholder:text-sm"
            onChange={onChange}
          />
        </div>

        <div className="relative w-full h-full">
          <BiKey className="absolute text-2xl top-[11px] left-2 text-gray-400" />
          <input
            name="password"
            type={formData.showPassword ? "text" : "password"}
            value={formData.password}
            placeholder="Enter password"
            className="outline-none border-[1px] px-9 py-[10px] rounded focus:border-blue-500 w-full h-full text-gray-500 placeholder:text-sm"
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

        <div className="relative w-full h-full">
          <BiLock className="absolute text-xl top-3 left-2 text-gray-400" />
          <input
            name="confirmPassword"
            type={formData.showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            placeholder="Confirm password"
            className="outline-none border-[1px] px-9 py-[10px] rounded focus:border-blue-500 w-full h-full text-gray-500 placeholder:text-sm"
            onChange={onChange}
          />
          {formData.showConfirmPassword ? (
            <MdVisibility
              name="showConfirmPassword"
              onClick={() => setShowPassword("showConfirmPassword")}
              className="cursor-pointer absolute text-xl top-3 right-2 text-gray-400"
            />
          ) : (
            <MdVisibilityOff
              name="showConfirmPassword"
              onClick={() => setShowPassword("showConfirmPassword")}
              className="cursor-pointer absolute text-xl top-3 right-2 text-gray-400"
            />
          )}
        </div>

        <span className="text-red-500 text-xs h-0">{error}</span>
      </div>

      <div className="text-gray-500 absolute -bottom-10 left-0 right-0 flex flex-col items-center justify-start gap-4 w-full">
        <div className="flex flex-row gap-2  text-sm">
          <span>Already have an account?</span>
          <Link
            href="/login"
            className="text-blue-500 underline underline-offset-2 "
          >
            Login
          </Link>
        </div>
      </div>
    </FormWrapper>
  );
}
