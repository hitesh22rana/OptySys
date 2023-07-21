"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

import { LoginFormData } from "@/types/common";
import { login } from "@/http";

import useUserStore from "@/stores/user";

import FormWrapper from "@/components/auth/FormWrapper";

import { MdOutlineEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { BiKey } from "react-icons/bi";

export default function Home() {
  const { setUser } = useUserStore();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    showPassword: false,
  });

  const router = useRouter();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // checks for formdata
    if (formData.email === "" || formData.password === "") {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const { data } = await Promise.resolve(await login(formData));
      setUser(data);
      toast.success("Successfully logged in");
      router.push("/dashboard");
    } catch (err) {
      toast.error("Invalid credentials");
    }
  }

  function setShowPassword() {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  }

  return (
    <FormWrapper
      title="Login"
      subtitle="Login to manage your account"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-4 w-full">
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
      </div>

      <div className="text-gray-500 absolute -bottom-10 flex flex-col items-center justify-start gap-4 w-full">
        <div className="flex flex-row gap-2  text-sm">
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
