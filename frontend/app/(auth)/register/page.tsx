"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";

import FormWrapper from "@/components/auth/FormWrapper";

import { MdOutlineEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { BiUser, BiKey, BiLock } from "react-icons/bi";

import { RegisterFormData } from "@/types/auth";
import { register, verify } from "@/http";
import { RegisterFormProps, VerifyFormProps } from "@/types/common";

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
      <div className="flex flex-col gap-[10px] w-full">
        <div className="relative w-full h-full">
          <BiUser className="absolute text-xl top-3 left-2 text-gray-400" />
          <input
            name="name"
            type="text"
            placeholder="Enter name"
            className="outline-none border-[1px] px-9 py-[10px] rounded focus:border-gray-400 w-full h-full text-gray-500 placeholder:text-sm"
            onChange={onChange}
          />
        </div>

        <div className="relative w-full h-full">
          <MdOutlineEmail className="absolute text-xl top-3 left-2 text-gray-400" />
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            className="outline-none border-[1px] px-9 py-[10px] rounded focus:border-gray-400 w-full h-full text-gray-500 placeholder:text-sm"
            onChange={onChange}
          />
        </div>

        <div className="relative w-full h-full">
          <BiKey className="absolute text-2xl top-[11px] left-2 text-gray-400" />
          <input
            name="password"
            type={formData.showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="outline-none border-[1px] px-9 py-[10px] rounded focus:border-gray-400 w-full h-full text-gray-500 placeholder:text-sm"
            minLength={3}
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
            name="verifyPassword"
            type={formData.showVerifyPassword ? "text" : "password"}
            placeholder="Confirm password"
            className="outline-none border-[1px] px-9 py-[10px] rounded focus:border-gray-400 w-full h-full text-gray-500 placeholder:text-sm"
            minLength={3}
            onChange={onChange}
          />
          {formData.showVerifyPassword ? (
            <MdVisibility
              name="showVerifyPassword"
              onClick={() => setShowPassword("showVerifyPassword")}
              className="cursor-pointer absolute text-xl top-3 right-2 text-gray-400"
            />
          ) : (
            <MdVisibilityOff
              name="showVerifyPassword"
              onClick={() => setShowPassword("showVerifyPassword")}
              className="cursor-pointer absolute text-xl top-3 right-2 text-gray-400"
            />
          )}
        </div>
      </div>

      <div className="text-gray-500 absolute -bottom-10 flex flex-col items-center justify-start gap-4 w-full">
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

function Verify({ onSubmit }: VerifyFormProps) {
  const [otp, setOtp] = useState<string>("");

  return (
    <FormWrapper
      title="Verify"
      subtitle="Enter the OTP sent to your email"
      onSubmit={(e) => onSubmit(e, otp)}
    >
      <OtpInput
        value={otp}
        numInputs={6}
        onChange={setOtp}
        renderInput={(props) => <input {...props} />}
        shouldAutoFocus={true}
        inputType="number"
        containerStyle={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: "1rem",
        }}
        inputStyle={{
          width: "100%",
          border: "none",
          outline: "none",
          fontSize: "1.5rem",
          color: "rgb(3, 7, 18)",
          backgroundColor: "rgb(246, 247, 249)",
          padding: "0.5rem",
        }}
      />
    </FormWrapper>
  );
}

export default function Home() {
  const [formData, setFormData] = useState<RegisterFormData>(
    {} as RegisterFormData
  );

  const router = useRouter();

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

  async function verifyUser(e: React.FormEvent<HTMLFormElement>, otp: string) {
    e.preventDefault();

    // checks for formdata
    if (!otp) {
      toast.error("Please fill in all fields");
      return;
    }

    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    try {
      const { data } = await Promise.resolve(
        await verify({
          user_details: {
            email: formData.email,
            password: formData.password,
            name: formData.name,
          },
          otp: otp,
          token: formData.token,
        })
      );
      console.log(data);
      router.push("/dashboard");
    } catch (err) {
      toast.error("Invalid OTP");
    }
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
        <Verify onSubmit={verifyUser} />
      )}
    </Fragment>
  );
}
