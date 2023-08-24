import Link from "next/link";

import { SlOrganization } from "react-icons/sl";
import { BiUser } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";

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
  {
    name: "Profile",
    icon: BiUser,
    path: "/dashboard/profile",
    cardBackground: "bg-blue-50",
    iconColor: "text-blue-500",
    iconBackground: "bg-blue-100",
    cardShadow: "shadow-blue-500",
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
              className={`group/dashboard-links flex w-full cursor-pointer flex-row items-center justify-between gap-2 rounded-md p-3 shadow hover:drop-shadow md:p-4 ${cardData.cardBackground} ${cardData.cardShadow}`}
            >
              <div className="flex flex-row items-center gap-4">
                <div
                  className={`rounded p-2 ${cardData.iconBackground} ${cardData.iconColor}`}
                >
                  <cardData.icon className="text-xl md:text-2xl" />
                </div>
                <span className="text-sm font-semibold text-gray-500 md:text-base">
                  {cardData.name}
                </span>
              </div>
              <AiOutlineArrowRight className="text-lg text-gray-500 transition-transform delay-75 duration-200 group-hover/dashboard-links:translate-x-[6px] md:text-xl" />
            </Link>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
