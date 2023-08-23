"use client";

import { useQuery } from "react-query";

import SectionWrapper from "@/src/components/dashboard/SectionWrapper";
import LoadingPage from "@/src/components/common/LoadingPage";

import { getOrganization } from "@/src/http";

import { useUserStore } from "@/src/stores";

export default function OrganizationsPage() {
  const { accessToken } = useUserStore();

  const { data, isLoading } = useQuery({
    queryKey: "organizations",
    queryFn: async () => getOrganization(accessToken),
    enabled: !!accessToken,
  });

  if (isLoading || !data) {
    return <LoadingPage />;
  }

  return (
    <SectionWrapper
      heading="Discover Organizations"
      subHeading="Find and connect with organizations that align with your goals."
    >
      <div className="grid h-full w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data?.data?.data?.map((org, _) => {
          return (
            <div
              key={org._id}
              className="flex flex-col items-start gap-4 rounded border-[1px] border-gray-200 p-3 shadow-md"
            >
              <div>
                <h4>name: {org.name}</h4>
                <p>desc: {org.description}</p>
                <span>total members: {org.total_members}</span>
              </div>

              <button className="rounded bg-[#28282B] px-2 py-1 text-sm text-white">
                {org.private ? "Request to join" : "Join"}
              </button>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
