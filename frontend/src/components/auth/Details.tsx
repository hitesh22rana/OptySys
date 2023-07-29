import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import Modal from "@/src/components/common/Modal";
import StepAbout from "@/src/components/auth/steps/StepAbout";
import StepBanner from "@/src/components/auth/steps/StepBanner";
import StepSubmit from "@/src/components/auth/steps/StepSubmit";
import StepSocials from "@/src/components/auth/steps/StepSocials";

import { updateUser } from "@/src/http";

import { useDetailsStore, useUserStore } from "@/src/stores";

import { DetailsStep } from "@/src/types/auth";

const steps: DetailsStep = {
  1: StepBanner,
  2: StepAbout,
  3: StepSocials,
  4: StepSubmit,
};

export default function Details() {
  const router = useRouter();

  const { details } = useDetailsStore();
  const { accessToken, getActivationStatus } = useUserStore();

  const [step, setStep] = useState<number>(1);

  const Step = steps[step];

  async function onNext(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (step != 4) {
      setStep((prev) => prev + 1);
      return;
    }

    try {
      await updateUser(accessToken, details);
      toast.success("Welcome to the club champion!");
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      router.push("/dashboard");
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  return (
    <Modal isOpen={!getActivationStatus()}>
      <Step onNext={onNext} />
    </Modal>
  );
}
