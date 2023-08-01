"use client";

import { Fragment, useState } from "react";

import Login from "@/src/components/auth/Login";
import ForgotPassword from "@/src/components/auth/ForgotPassword";

export default function LoginPage() {
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);

  function toggleForgotPassword() {
    setForgotPassword((prev) => !prev);
  }

  return (
    <Fragment>
      {!forgotPassword ? (
        <Login toggleForgotPassword={toggleForgotPassword} />
      ) : (
        <ForgotPassword />
      )}
    </Fragment>
  );
}
