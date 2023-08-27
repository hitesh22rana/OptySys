"use client";

import { useEffect, useState } from "react";

import { BiUser } from "react-icons/bi";
import Select, { MultiValue } from "react-select";

import SectionWrapper from "@/src/components/dashboard/SectionWrapper";

import { useUserStore } from "@/src/stores";

import { IOption } from "@/src/types/common";
import { defaultSkills, getSkillsList } from "@/src/lib/helpers";

export default function ProfilePage() {
  const { user } = useUserStore();

  const [summary, setSummary] = useState<string>(user?.summary);

  const [skills, setSkills] = useState<Array<string>>(user?.skills);
  const [allSkills, setAllSkills] = useState<Array<IOption>>([]);

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

    // const errorMessage = getAboutStepErrors(value, skills);

    // setError(errorMessage);
  }

  function onSkillsChange(option: MultiValue<IOption>) {
    const currentSkills: Array<string> = option.map((opt) => opt.value);

    setSkills(currentSkills);
  }

  return (
    <SectionWrapper
      heading="User Profile"
      subHeading="Manage your profile information and preferences."
    >
      <section className="flex w-full flex-col items-start justify-start gap-10">
        <div className="flex flex-row gap-2">
          <BiUser className="h-16 w-16 rounded-full border-[1px] bg-slate-50 p-2 text-gray-500 shadow-sm backdrop-blur-sm md:h-20 md:w-20" />

          <div className="flex h-full flex-col items-start justify-center gap-1 p-1 md:gap-2 md:p-3">
            <span className="font-normal text-gray-500 md:font-medium">
              {user?.name}
            </span>
            <span className="font-normal text-gray-500 md:font-medium">
              {user?.email}
            </span>
          </div>
        </div>
      </section>
      <section className="my-10 grid h-full w-full grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="flex h-full w-full flex-col gap-2">
          <label
            htmlFor="summary"
            className="text-xl font-semibold text-gray-700 md:text-3xl"
          >
            Summary
          </label>
          <textarea
            name="summary"
            value={summary}
            placeholder="e.g. Experienced technical specialist and IT professional, proficient in systems administration, with a background in programming."
            className="h-auto max-h-32 min-h-[8rem] w-full rounded border-[1px] p-2 text-sm text-gray-500 outline-none placeholder:text-sm placeholder:font-light focus:outline-none focus:ring-1 focus:ring-gray-400"
            onChange={onSummaryChange}
          />
        </div>

        <div className="flex h-full w-full flex-col gap-[5px]">
          <span className="text-xl font-semibold text-gray-700 md:text-3xl">
            Add skills
          </span>
          <Select
            options={allSkills}
            isMulti={true}
            isSearchable={true}
            onChange={onSkillsChange}
            backspaceRemovesValue={true}
            blurInputOnSelect={true}
            defaultValue={defaultSkills(user?.skills)}
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
      </section>
    </SectionWrapper>
  );
}
