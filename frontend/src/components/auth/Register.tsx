import Link from "next/link";

import { MdOutlineEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { BiUser, BiKey, BiLock } from "react-icons/bi";

import FormWrapper from "@/src/components/common/FormWrapper";
import ErrorField from "@/src/components/common/ErrorField";

import { RegisterFormProps } from "@/src/types/common";

export default function Register({
  formData,
  onChange,
  setShowPassword,
  error,
  disabled,
  onSubmit,
}: RegisterFormProps) {
  return (
    <FormWrapper
      title="Register"
      subtitle="Create your account and let the fun begin!"
      buttonText="Register"
      disabled={disabled}
      onSubmit={onSubmit}
    >
      <div className="flex w-full flex-col gap-3">
        <div className="relative h-full w-full">
          <BiUser className="absolute left-2 top-3 text-xl text-gray-400" />
          <input
            name="name"
            type="text"
            value={formData.name}
            placeholder="Enter name"
            className="h-full w-full rounded border-[1px] px-9 py-[10px] text-gray-500 outline-none placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            onChange={onChange}
          />
        </div>

        <div className="relative h-full w-full">
          <MdOutlineEmail className="absolute left-2 top-3 text-xl text-gray-400" />
          <input
            name="email"
            type="email"
            value={formData.email}
            placeholder="Enter email"
            className="h-full w-full rounded border-[1px] px-9 py-[10px] text-gray-500 outline-none placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            onChange={onChange}
          />
        </div>

        <div className="relative h-full w-full">
          <BiKey className="absolute left-2 top-[9px] text-2xl text-gray-400" />
          <input
            name="password"
            type={formData.showPassword ? "text" : "password"}
            value={formData.password}
            placeholder="Enter password"
            className="h-full w-full rounded border-[1px] px-9 py-[10px] text-gray-500 outline-none placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
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
            className="h-full w-full rounded border-[1px] px-9 py-[10px] text-gray-500 outline-none placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
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

      <div className="absolute -bottom-10 left-0 right-0 flex w-full flex-col items-center justify-start gap-4 text-gray-500">
        <div className="flex flex-row gap-2  text-sm">
          <span>Already have an account?</span>
          <Link
            href="/login"
            className="text-blue-500 underline underline-offset-2"
          >
            Login
          </Link>
        </div>
      </div>
    </FormWrapper>
  );
}
