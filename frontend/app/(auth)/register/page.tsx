"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

import FormWrapper from "@/components/auth/FormWrapper";

import { MdOutlineEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { BiUser, BiKey, BiLock } from "react-icons/bi";

import { RegisterFormData } from "@/types/auth";
import { register } from "@/http";
import { RegisterFormProps } from "@/types/common";

function Register({
  formData,
  setShowPassword,
  onChange,
  onSubmit,
}: RegisterFormProps) {
  return (
    <FormWrapper
      title="Register"
      subtitle="Create your account and let the fun begin!"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col sm:gap-3 gap-2 w-full">
        <div className="relative w-full h-full">
          <BiUser className="absolute text-2xl top-3 left-2 text-gray-400" />
          <input
            name="name"
            type="text"
            placeholder="Enter name"
            className="outline-none border-[1px] px-2 py-3 rounded focus:border-gray-400 w-full h-full pl-10 text-gray-500 pr-4"
            onChange={onChange}
          />
        </div>

        <div className="relative w-full h-full">
          <MdOutlineEmail className="absolute text-2xl top-3 left-2 text-gray-400" />
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            className="outline-none border-[1px] px-2 py-3 rounded focus:border-gray-400 w-full h-full pl-10 text-gray-500 pr-4"
            onChange={onChange}
          />
        </div>

        <div className="relative w-full h-full">
          <BiKey className="absolute text-3xl top-2 left-2 text-gray-400" />
          <input
            name="password"
            type={formData.showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="outline-none border-[1px] px-10 py-3 rounded focus:border-gray-400 w-full h-full text-gray-500"
            minLength={3}
            onChange={onChange}
          />
          {formData.showPassword ? (
            <MdVisibility
              name="showPassword"
              onClick={() => setShowPassword("showPassword")}
              className="cursor-pointer absolute text-2xl top-3 right-2 text-gray-400"
            />
          ) : (
            <MdVisibilityOff
              name="showPassword"
              onClick={() => setShowPassword("showPassword")}
              className="cursor-pointer absolute text-2xl top-3 right-2 text-gray-400"
            />
          )}
        </div>

        <div className="relative w-full h-full">
          <BiLock className="absolute text-2xl top-3 left-2 text-gray-400" />
          <input
            name="verifyPassword"
            type={formData.showVerifyPassword ? "text" : "password"}
            placeholder="Confirm password"
            className="outline-none border-[1px] px-10 py-3 rounded focus:border-gray-400 w-full h-full text-gray-500"
            minLength={3}
            onChange={onChange}
          />
          {formData.showVerifyPassword ? (
            <MdVisibility
              name="showVerifyPassword"
              onClick={() => setShowPassword("showVerifyPassword")}
              className="cursor-pointer absolute text-2xl top-3 right-2 text-gray-400"
            />
          ) : (
            <MdVisibilityOff
              name="showVerifyPassword"
              onClick={() => setShowPassword("showVerifyPassword")}
              className="cursor-pointer absolute text-2xl top-3 right-2 text-gray-400"
            />
          )}
        </div>
      </div>

      <div className="text-gray-500 absolute -bottom-10 flex flex-col items-center justify-start gap-4 w-full">
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

function Verify({ formData, onChange, onSubmit }: any) {
  return (
    <FormWrapper
      title="Verify"
      subtitle="Enter the OTP sent to your email"
      onSubmit={onSubmit}
    >
      <div></div>
    </FormWrapper>
  );
}

export default function Home() {
  const [formData, setFormData] = useState<RegisterFormData>(
    {} as RegisterFormData
  );

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function setShowPassword(name: string) {
    setFormData({ ...formData, [name]: !formData[name] });
  }

  async function registerUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // checks for formdata
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.verifyPassword
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.verifyPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await Promise.resolve(await register(formData));
      setFormData({
        ...formData,
        token: data.token,
      });
      toast.success("OTP sent successfully");
    } catch (err) {
      toast.error("Something went wrong");
    }
  }

  async function verify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <Fragment>
      {!formData.token ? (
        <Register
          formData={formData}
          setShowPassword={setShowPassword}
          onChange={onChange}
          onSubmit={registerUser}
        />
      ) : (
        <Verify formData={formData} onChange={onChange} onSubmit={verify} />
      )}
    </Fragment>
  );
}
