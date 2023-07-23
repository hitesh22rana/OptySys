import { useState } from "react";

import Modal from "@/components/common/Modal";
import StepAbout from "@/components/auth/steps/StepAbout";
import StepBanner from "@/components/auth/steps/StepBanner";
import { DetailsStep } from "@/types/auth";

const steps: DetailsStep = {
  1: StepBanner,
  2: StepAbout,
};

export default function Details() {
  const [step, setStep] = useState<number>(1);

  const Step = steps[step];

  function onNext() {
    setStep((prev) => prev + 1);
  }

  return (
    <Modal bgMaskColor="rgba(0,0,0,0.7)">
      <Step onNext={onNext} />
    </Modal>
  );
}
