import { useState } from "react";

import Modal from "@/components/common/Modal";
import StepAbout from "@/components/auth/steps/StepAbout";
import StepBanner from "@/components/auth/steps/StepBanner";
import StepSubmit from "@/components/auth/steps/StepSubmit";
import StepSocials from "@/components/auth/steps/StepSocials";

import { useDetailsStore } from "@/stores";

import { DetailsStep } from "@/types/auth";

const steps: DetailsStep = {
  1: StepBanner,
  2: StepAbout,
  3: StepSocials,
  4: StepSubmit,
};

export default function Details() {
  const { details } = useDetailsStore();

  const [step, setStep] = useState<number>(1);

  const Step = steps[step];

  function onNext() {
    if (step != 4) {
      setStep((prev) => prev + 1);
      return;
    }
  }

  return (
    <Modal bgMaskColor="rgba(105,105,105,0.1)">
      <Step onNext={onNext} />
    </Modal>
  );
}
