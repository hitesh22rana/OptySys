import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { toast } from "react-toastify";

const Modal = dynamic(() => import("@/src/components/common/Modal"));
const StepAbout = dynamic(
  () => import("@/src/components/auth/steps/StepAbout")
);
const StepBanner = dynamic(
  () => import("@/src/components/auth/steps/StepBanner")
);
const StepSubmit = dynamic(
  () => import("@/src/components/auth/steps/StepSubmit")
);
const StepSocials = dynamic(
  () => import("@/src/components/auth/steps/StepSocials")
);

import { updateUser } from "@/src/http";

import { useDetailsStore, useUserStore } from "@/src/stores";

const steps = {
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
