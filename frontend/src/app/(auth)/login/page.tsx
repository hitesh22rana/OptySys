"use client";

import { Fragment, useState } from "react";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("@/src/components/auth/Login"));
const ForgotPassword = dynamic(
  () => import("@/src/components/auth/ForgotPassword")
);

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
        <ForgotPassword toggleForgotPassword={toggleForgotPassword} />
      )}
    </Fragment>
  );
}
