import Image from "next/image";
import dynamic from "next/dynamic";

const FormWrapper = dynamic(() => import("@/src/components/ui/FormWrapper"));

import { DetailStepProps } from "@/src/types/auth";

export default function StepSubmit({ onNext }: DetailStepProps) {
  return (
    <FormWrapper
      title="Hurray🎊 all set"
      subtitle="Get ready for a smoother ride with OptySys! 🚀✨"
      buttonText="Dashboard"
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
          Hey there! 🎉 superstar! Ready to unleash the power of streamlining
          and automation? Don&apos;t be shy, update your details anytime you
          like, and let the streamlining wizardry work its charm! 🧙‍♂️✨
          Don&apos;t miss out on the fun, hop in and witness the magic! 🌟😄
        </span>
      </div>
    </FormWrapper>
  );
}
