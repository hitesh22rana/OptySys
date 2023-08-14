import Link from "next/link";

import { AiOutlineArrowRight } from "react-icons/ai";
import { SlOrganization } from "react-icons/sl";

import SectionWrapper from "@/src/components/dashboard/SectionWrapper";

import { ICardData } from "@/src/types/common";

const cardsData: Array<ICardData> = [
  {
    name: "Organizations",
    icon: SlOrganization,
    path: "/dashboard/organizations",
    cardBackground: "bg-violet-50",
    iconColor: "text-violet-500",
    iconBackground: "bg-violet-100",
    cardShadow: "shadow-violet-500",
  },
];

export default function DashboardPage() {
  return (
    <SectionWrapper
      heading="Explore the power of Automation"
      subHeading="Streamlining opportunities with efficient matching and automation."
    >
      <div className="my-5 flex w-full max-w-3xl flex-col items-center justify-center gap-4 p-2 3xl:max-w-4xl">
        {cardsData.map((cardData: ICardData, index: number) => {
          return (
            <Link
              href={cardData.path}
              key={index}
              className={`flex w-full cursor-pointer flex-row items-center justify-between gap-2 rounded-md p-3 shadow md:p-4 ${cardData.cardBackground} ${cardData.cardShadow}`}
            >
              <div className="flex flex-row items-center gap-4">
                <div
                  className={`rounded p-2 ${cardData.iconBackground} ${cardData.iconColor}`}
                >
                  <cardData.icon className="text-xl md:text-2xl" />
                </div>
                <span className="text-sm font-semibold text-gray-700 md:text-base">
                  {cardData.name}
                </span>
              </div>
              <AiOutlineArrowRight className="text-lg md:text-xl" />
            </Link>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
