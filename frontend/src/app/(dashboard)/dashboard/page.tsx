"use client";

import { useQuery } from "react-query";

import { getOrganization } from "@/src/http";

import { useUserStore } from "@/src/stores";

export default function DashboardPage() {
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
    <div className="flex flex-col w-full h-full">
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full h-full">
        {data?.data?.data?.map((org, _) => {
          return (
            <div
              key={org._id}
              className="p-4 shadow-md border-[1px] border-gray-200 rounded"
            >
              <h4>name: {org.name}</h4>
              <p>desc: {org.description}</p>
              <span>total members: {org.total_members}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
