import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { toast } from "react-toastify";
import Select, { MultiValue } from "react-select";

const FormWrapper = dynamic(() => import("@/src/components/ui/FormWrapper"));
const ErrorField = dynamic(() => import("@/src/components/ui/ErrorField"));

import { useDetailsStore } from "@/src/stores";

import { DetailStepProps } from "@/src/types/auth";
import { IOption } from "@/src/types/common";

import { getAboutStepErrors } from "@/src/utils/errors";
import { getSkillsList } from "@/src/lib/helpers";

export default function StepAbout({ onNext }: DetailStepProps) {
  const { setDetails } = useDetailsStore();

  const [allSkills, setAllSkills] = useState<Array<IOption>>([]);

  const [summary, setSummary] = useState<string>("");
  const [skills, setSkills] = useState<Array<string>>([]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getSkillsData() {
      const data = await getSkillsList();
      setAllSkills(data);
    }

    getSkillsData();
  }, []);

  function onSummaryChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value: string = e.target.value;

    setSummary(value);

    const errorMessage = getAboutStepErrors(value, skills);

    setError(errorMessage);
  }

  function onSkillsChange(option: MultiValue<IOption>) {
    const currentSkills: Array<string> = option.map((opt) => opt.value);

    setSkills(currentSkills);

    const errorMessage = getAboutStepErrors(summary, currentSkills);
    setError(errorMessage);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // checks for data
    const errorMessage = getAboutStepErrors(summary, skills);

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    setDetails("summary", summary);
    setDetails("skills", skills);

    onNext(e);
  }

  return (
    <FormWrapper
      title="About"
      subtitle="Please provide some basic information about yourself."
      buttonText="Next"
      onSubmit={onSubmit}
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex h-full w-full flex-col gap-[5px]">
          <label htmlFor="summary" className="text-sm font-medium">
            Briefly summarize your professional background
          </label>
          <textarea
            name="summary"
            value={summary}
            placeholder="e.g. Experienced technical specialist and IT professional, proficient in systems administration, with a background in programming."
            className="h-auto max-h-32 min-h-[8rem] w-full rounded border-[1px] p-2 text-sm text-gray-500 outline-none placeholder:text-xs placeholder:font-light focus:outline-none focus:ring-1 focus:ring-gray-400"
            onChange={onSummaryChange}
          />
        </div>

        <div className="flex h-full w-full flex-col gap-[5px]">
          <span className="text-sm font-medium">Add skills</span>
          <Select
            options={allSkills}
            isMulti={true}
            isSearchable={true}
            onChange={onSkillsChange}
            backspaceRemovesValue={true}
            blurInputOnSelect={true}
            styles={{
              menuList: (provided) => ({
                ...provided,
                height: "100%",
                maxHeight: "170px",
              }),
              control: (provided) => ({
                ...provided,
                outline: "1px solid rgb(107, 114, 128)",
                border: "none",
              }),
            }}
          />
        </div>

        <ErrorField error={error} />
      </div>
    </FormWrapper>
  );
}
