"use client";

import { useQuery } from "react-query";

import { getOrganization } from "@/src/http";

import { useUserStore } from "@/src/stores";
import SectionWrapper from "@/src/components/dashboard/SectionWrapper";

export default function OrganizationsPage() {
  const { accessToken } = useUserStore();

  const { data, isLoading } = useQuery({
    queryKey: "organizations",
    queryFn: async () => getOrganization(accessToken),
    enabled: !!accessToken,
  });

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <SectionWrapper heading="Explore Organizations">
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full h-full">
        {data?.data?.data?.map((org, _) => {
          return (
            <div
              key={org._id}
              className="flex flex-col items-start gap-4 p-3 shadow-md border-[1px] border-gray-200 rounded"
            >
              <div>
                <h4>name: {org.name}</h4>
                <p>desc: {org.description}</p>
                <span>total members: {org.total_members}</span>
              </div>

              <button className="px-2 py-1 text-sm bg-[#28282B] text-white rounded">
                {org.private ? "Request to join" : "Join"}
              </button>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
