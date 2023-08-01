"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";

import { AxiosError } from "axios";
import { toast } from "react-toastify";

import Register from "@/src/components/auth/Register";
import Verify from "@/src/components/auth/Verify";

import { register, verify } from "@/src/http";

import { RegisterFormData } from "@/src/types/auth";
import { getRegisterFormErrors } from "@/src/utils/errors";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormData>(
    {} as RegisterFormData
  );
  const [error, setError] = useState<string | null>(null);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name: string = e.target.name;
    const value: string = e.target.value;

    setFormData({ ...formData, [name]: value });

    let userName;
    let email;
    let password;
    let confirmPassword;

    switch (name) {
      case "name":
        userName = value;
        email = formData.email;
        password = formData.password;
        confirmPassword = formData.confirmPassword;
        break;

      case "email":
        userName = formData.name;
        email = value;
        password = formData.password;
        confirmPassword = formData.confirmPassword;
        break;

      case "password":
        userName = formData.name;
        email = formData.email;
        password = value;
        confirmPassword = formData.confirmPassword;
        break;

      case "confirmPassword":
        userName = formData.name;
        email = formData.email;
        password = formData.password;
        confirmPassword = value;
        break;

      default:
        userName = formData.name;
        email = formData.email;
        password = formData.password;
        confirmPassword = formData.confirmPassword;
    }

    const errorMessage = getRegisterFormErrors(
      userName,
      email,
      password,
      confirmPassword
    );

    setError(errorMessage);
  }

  function setShowPassword(name: string) {
    setFormData({ ...formData, [name]: !formData[name] });
  }

  async function sendOTP() {
    try {
      const { data } = await register({ email: formData.email });
      setFormData({
        ...formData,
        token: data.token,
      });
      toast.success("OTP sent successfully.");
    } catch (err: AxiosError | any) {
      const errorMessage: string | Array<string> = err.response?.data?.detail;

      if (errorMessage) {
        toast.error(errorMessage);
        return;
      }
      toast.error("Something went wrong.");
    }
  }

  async function registerUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // checks for formdata
    const errorMessage = getRegisterFormErrors(
      formData.name,
      formData.email,
      formData.password,
      formData.confirmPassword
    );

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    await sendOTP();
  }

  async function verifyUser(e: React.FormEvent<HTMLFormElement>, otp: string) {
    e.preventDefault();

    // checks for formdata
    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits.");
      return;
    }

    try {
      await verify({
        user_details: {
          email: formData.email,
          password: formData.password,
          name: formData.name,
        },
        otp: otp,
        token: formData.token,
      });

      router.push("/dashboard");
    } catch (err) {
      toast.error("Invalid OTP.");
    }
  }

  return (
    <Fragment>
      {!formData.token ? (
        <Register
          error={error}
          formData={formData}
          setShowPassword={setShowPassword}
          onChange={onChange}
          onSubmit={registerUser}
        />
      ) : (
        <Verify resendOTP={sendOTP} onSubmit={verifyUser} />
      )}
    </Fragment>
  );
}
