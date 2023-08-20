import { useState } from "react";
import dynamic from "next/dynamic";

import { toast } from "react-toastify";

const FormWrapper = dynamic(
  () => import("@/src/components/common/FormWrapper")
);

import { useDetailsStore } from "@/src/stores";

import { DetailStepProps, SocialMap } from "@/src/types/auth";
import { Social } from "@/src/types/user";

import { getSocialStepErrors } from "@/src/utils/errors";

export default function StepSocials({ onNext }: DetailStepProps) {
  const { setDetails } = useDetailsStore();

  const [socials, setSocials] = useState<Social>({} as Social);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name: string = e.target.name;
    const value: string = e.target.value;

    setSocials({
      ...socials,
      [name]: value,
    });
  }

  const socialMap: Array<SocialMap> = [
    {
      name: "resume",
      text: "Resume",
      value: socials.resume,
      placeholder: "Enter your resume's link",
    },
    {
      name: "portfolio",
      text: "Portfolio",
      value: socials.portfolio,
      placeholder: "Enter your portfolio's link",
    },
    {
      name: "linkedin",
      text: "Linkedin",
      value: socials.linkedin,
      placeholder: "Enter your linkedin's profile link",
    },
    {
      name: "github",
      text: "Github",
      value: socials.github,
      placeholder: "Enter your github's profile link",
    },
    {
      name: "twitter",
      text: "Twitter",
      value: socials.twitter,
      placeholder: "Enter your twitter's profile link",
    },
    {
      name: "behance",
      text: "Behance",
      value: socials.behance,
      placeholder: "Enter your behance's profile link",
    },
    {
      name: "dribbble",
      text: "Dribbble",
      value: socials.dribbble,
      placeholder: "Enter your dribbble's profile link",
    },
  ];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const errorMessage = getSocialStepErrors(socials);
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    const socialsList: Array<Social> = [];

    for (const key in socials) {
      if (socials[key]) {
        socialsList.push({ [key]: socials[key] });
      }
    }

    setDetails("socials", socialsList);

    onNext(e);
  }

  return (
    <FormWrapper
      title="Socials"
      subtitle="Please provide atleast one of your social links"
      buttonText="Next"
      onSubmit={onSubmit}
      className="sm:gap-6"
    >
      <div
        className="flex h-full w-full flex-col"
        style={{
          scrollbarWidth: "none",
        }}
      >
        <div className="flex h-full w-full flex-col gap-4">
          {socialMap.map((item, index) => {
            return (
              <div
                key={index}
                className="flex h-full w-full flex-row items-center gap-1 2xl:flex-col 2xl:items-start"
              >
                <label
                  htmlFor={item.name}
                  className="flex w-24 items-end text-sm font-medium"
                >
                  {item.text}
                </label>
                <input
                  name={item.name}
                  type="text"
                  value={item.value}
                  placeholder={item.placeholder}
                  className="w-full rounded border-[1px] p-2 text-sm text-gray-500 outline-none placeholder:text-xs placeholder:font-light focus:border-[#28282B]"
                  onChange={onChange}
                />
              </div>
            );
          })}
        </div>
      </div>
    </FormWrapper>
  );
}
