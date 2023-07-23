import { useState } from "react";

import OtpInput from "react-otp-input";

import FormWrapper from "@/components/common/FormWrapper";

import { VerifyFormProps } from "@/types/common";

export default function Verify({ onSubmit }: VerifyFormProps) {
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
          borderRadius: "0.4rem",
          color: "rgb(3, 7, 18)",
          backgroundColor: "rgb(246, 247, 249)",
          padding: "0.5rem",
        }}
      />
    </FormWrapper>
  );
}
