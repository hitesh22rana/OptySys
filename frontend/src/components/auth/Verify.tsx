import { useState } from "react";
import dynamic from "next/dynamic";

import OtpInput from "react-otp-input";

const FormWrapper = dynamic(
  () => import("@/src/components/common/FormWrapper")
);

import useTimer from "@/src/hooks/useTimer";

import { VerifyFormProps } from "@/src/types/common";

export default function Verify({ resendOTP, onSubmit }: VerifyFormProps) {
  const { startTimer, isTimerActive, remainingTime } = useTimer(120);
  const [otp, setOtp] = useState<string>("");

  async function onResend() {
    await resendOTP();
    startTimer(120);
  }

  return (
    <FormWrapper
      title="Verify"
      subtitle="Enter the OTP sent to your email"
      buttonText="Verify"
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
          gap: "0.8rem",
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

      <div className="absolute -bottom-10 left-0 right-0 flex w-full flex-col items-center justify-start gap-4 text-gray-500">
        <div className="flex flex-row gap-2  text-sm">
          <span>Haven&apos;t received OTP?</span>
          {isTimerActive ? (
            <span>
              Resend OTP in{" "}
              <span className="font-medium text-blue-500">{remainingTime}</span>{" "}
              seconds
            </span>
          ) : (
            <button
              type="button"
              className="font-medium text-blue-500"
              onClick={onResend}
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </FormWrapper>
  );
}
