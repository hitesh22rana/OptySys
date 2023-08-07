import Image from "next/image";
import dynamic from "next/dynamic";

const FormWrapper = dynamic(
  () => import("@/src/components/common/FormWrapper")
);

import { DetailStepProps } from "@/src/types/auth";

export default function StepBanner({ onNext }: DetailStepProps) {
  return (
    <FormWrapper
      title="Basic Details"
      subtitle="Please provide the basic details."
      buttonText="Start"
      onSubmit={onNext}
    >
      <div className="flex flex-col gap-[10px] w-full">
        <Image
          src="/images/wave.gif"
          alt="Waving"
          height={150}
          width={150}
          className="mx-auto"
        />
        <span className="text-gray-500 font-medium text-sm">
          These details are important to activate your account and streamline
          the automation process.
        </span>
      </div>
    </FormWrapper>
  );
}
