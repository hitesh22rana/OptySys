"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

import FormWrapper from "@/components/auth/FormWrapper";

import { MdOutlineEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { BiUser, BiKey, BiLock } from "react-icons/bi";

import { RegisterFormData } from "@/types/auth";

export default function Home() {
  const [formData, setFormData] = useState<RegisterFormData>(
    {} as RegisterFormData
  );

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
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
  }

  function setShowPassword() {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  }

  function setShowVerifyPassword() {
    setFormData({
      ...formData,
      showVerifyPassword: !formData.showVerifyPassword,
    });
  }

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
              onClick={setShowPassword}
              className="cursor-pointer absolute text-2xl top-3 right-2 text-gray-400"
            />
          ) : (
            <MdVisibilityOff
              name="showPassword"
              onClick={setShowPassword}
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
              onClick={setShowVerifyPassword}
              className="cursor-pointer absolute text-2xl top-3 right-2 text-gray-400"
            />
          ) : (
            <MdVisibilityOff
              name="showVerifyPassword"
              onClick={setShowVerifyPassword}
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
