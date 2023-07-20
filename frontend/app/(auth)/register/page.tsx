"use client";

import { useState } from "react";
import FormWrapper from "@/components/auth/FormWrapper";

import { toast } from "react-toastify";

import { SignupFormData } from "@/types/common";
import { login } from "@/http";

export default function Home() {
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
    verify_password:""
  });

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // checks for formdata
    if (formData.email === "" || formData.password === "" || formData.verify_password==="") {
      toast.error("Please fill in all fields");
      return;
    }
    if(formData.password!==formData.verify_password){
      toast.error("Please fill correct password");
      return;
    }
    try {
      const { data } = await login(formData);
      console.log(data);
    } catch (err) {
      toast.error("Invalid credentials");
    }
  }

  return (
    <FormWrapper
      title="Signup"
      subtitle="signup to create your account"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-4 w-full">
        <input
          name="email"
          type="email"
          placeholder="Enter email"
          className="outline-none border-2 p-2 rounded"
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Enter password"
          className="outline-none border-2 p-2 rounded"
          minLength={3}
          onChange={onChange}
        />
        <input
          name="verify_password"
          type="password"
          placeholder="verify password"
          className="outline-none border-2 p-2 rounded"
          minLength={3}
          onChange={onChange}
        />
      </div>
    </FormWrapper>
  );
}