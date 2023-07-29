import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import Select from "react-select";
import { MultiValue } from "react-select/dist/declarations/src";

import FormWrapper from "@/src/components/common/FormWrapper";
import ErrorField from "@/src/components/common/ErrorField";

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
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-[5px] w-full h-full">
          <label htmlFor="summary" className="font-medium text-sm">
            Briefly summarize your professional background
          </label>
          <textarea
            name="summary"
            value={summary}
            placeholder="e.g. Experienced technical specialist and IT professional, proficient in systems administration, with a background in programming."
            className="outline-none border-[1px] h-auto max-h-32 min-h-[8rem] p-2 rounded focus:border-blue-500 w-full text-gray-500 text-sm placeholder:text-xs placeholder:font-light"
            onChange={onSummaryChange}
          />
        </div>

        <div className="flex flex-col gap-[5px] w-full h-full">
          <span className="font-medium text-sm">Add skills</span>
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
            }}
          />
        </div>

        <ErrorField error={error} />
      </div>
    </FormWrapper>
  );
}
