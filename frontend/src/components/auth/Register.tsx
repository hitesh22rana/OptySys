import Link from "next/link";

import { MdOutlineEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { BiUser, BiKey, BiLock } from "react-icons/bi";

import FormWrapper from "@/src/components/ui/FormWrapper";
import InputField from "@/src/components/ui/InputField";
import ErrorField from "@/src/components/ui/ErrorField";

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
      <section className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-col gap-4">
          <InputField
            name="name"
            type="text"
            value={formData.name}
            placeholder="Enter name"
            onChange={onChange}
            IconLeft={BiUser}
          />

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

          <InputField
            name="confirmPassword"
            type={formData.showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            placeholder="Confirm password"
            onChange={onChange}
            IconLeft={BiLock}
            IconRight={
              formData.showConfirmPassword ? MdVisibility : MdVisibilityOff
            }
            onRightIconClick={() => setShowPassword("showConfirmPassword")}
          />
        </div>

        <ErrorField error={error} />
      </section>

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
