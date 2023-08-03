import Link from "next/link";

import { AiOutlineArrowRight } from "react-icons/ai";
import { SlOrganization } from "react-icons/sl";

const cardsData: any = [
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
    <div className="flex flex-col w-full h-full items-center">
      <div className="flex flex-col items-center justify-center p-2 my-2 gap-4">
        <h2 className="md:text-4xl text-2xl font-bold">
          Explore the power of Automation
        </h2>
        <p className="text-gray-500 font-light md:text-lg text-sm">
          Streamlining opportunities with efficient matching and automation.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center p-2 gap-4 max-w-3xl w-full my-5">
        {cardsData.map((cardData: any, index) => {
          return (
            <Link
              href={cardData.path}
              key={index}
              className={`cursor-pointer flex flex-row md:p-3 p-3 w-full items-center justify-between gap-2 rounded-md shadow-md ${cardData.cardBackground} ${cardData.cardShadow}`}
            >
              <div className="flex flex-row items-center gap-4">
                <div
                  className={`p-2 rounded ${cardData.iconBackground} ${cardData.iconColor}`}
                >
                  <cardData.icon className="md:text-2xl text-xl" />
                </div>
                <span className="md:text-base text-sm font-semibold text-gray-700">
                  {cardData.name}
                </span>
              </div>
              <AiOutlineArrowRight className="md:text-xl text-lg" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
