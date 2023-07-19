"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { FormData } from "@/types/common";
import { login } from "@/http";

import useUserStore from "@/stores/user";

import FormWrapper from "@/components/auth/FormWrapper";

export default function Home() {
  const { setUser } = useUserStore();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
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

  return (
    <FormWrapper
      title="Login"
      subtitle="Login to manage your account"
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
      </div>
    </FormWrapper>
  );
}
