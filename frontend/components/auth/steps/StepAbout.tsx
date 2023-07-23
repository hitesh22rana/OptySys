import { useState } from "react";

import { toast } from "react-toastify";

import FormWrapper from "@/components/common/FormWrapper";

import { DetailStep } from "@/types/auth";

import { getAboutStepErrors } from "@/utils/errors";
import { useDetailsStore } from "@/stores";

export default function StepAbout({ onNext }: DetailStep) {
  const { setDetails } = useDetailsStore();
  const [summary, setSummary] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value: string = e.target.value;

    setSummary(value);

    const errorMessage = getAboutStepErrors(value);

    setError(errorMessage);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // checks for data
    const errorMessage = getAboutStepErrors(summary);

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    setDetails("summary", summary);

    return;

    // onNext();
  }

  return (
    <FormWrapper
      title="About"
      subtitle="Please provide some basic information about yourself."
      buttonText="Next"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-[10px] w-full">
        <div className="flex flex-col gap-[5px] w-full h-full">
          <label htmlFor="summary" className="font-medium text-sm">
            Briefly summarize your professional background
          </label>
          <textarea
            name="summary"
            value={summary}
            placeholder="e.g. Experienced technical specialist and IT professional, proficient in systems administration, with a background in programming."
            className="outline-none border-[1px] h-auto max-h-32 min-h-[6rem] p-2 rounded focus:border-blue-500 w-full text-gray-500 text-sm placeholder:text-xs placeholder:font-light"
            onChange={onChange}
          />
        </div>

        <span className="text-red-500 text-xs h-0">{error}</span>
      </div>
    </FormWrapper>
  );
}
