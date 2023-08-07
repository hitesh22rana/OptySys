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
        className="flex flex-col w-full h-full"
        style={{
          scrollbarWidth: "none",
        }}
      >
        <div className="flex flex-col gap-4 w-full h-full">
          {socialMap.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-row gap-1 2xl:flex-col items-center 2xl:items-start h-full w-full"
              >
                <label
                  htmlFor={item.name}
                  className="font-medium flex items-end text-sm w-24"
                >
                  {item.text}
                </label>
                <input
                  name={item.name}
                  type="text"
                  value={item.value}
                  placeholder={item.placeholder}
                  className="outline-none border-[1px] p-2 rounded focus:border-blue-500 w-full text-gray-500 text-sm placeholder:text-xs placeholder:font-light"
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
