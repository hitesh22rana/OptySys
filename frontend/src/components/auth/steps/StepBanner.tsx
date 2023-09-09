import Image from "next/image";
import dynamic from "next/dynamic";

const FormWrapper = dynamic(() => import("@/src/components/ui/FormWrapper"));

import { DetailStepProps } from "@/src/types/auth";

export default function StepBanner({ onNext }: DetailStepProps) {
  return (
    <FormWrapper
      title="Basic Details"
      subtitle="Please provide the basic details."
      buttonText="Start"
      onSubmit={onNext}
    >
      <div className="flex w-full flex-col gap-[10px]">
        <Image
          src="/images/wave.gif"
          alt="Waving"
          height={150}
          width={150}
          className="mx-auto"
        />
        <span className="text-sm font-medium text-gray-500">
          These details are important to activate your account and streamline
          the automation process.
        </span>
      </div>
    </FormWrapper>
  );
}
