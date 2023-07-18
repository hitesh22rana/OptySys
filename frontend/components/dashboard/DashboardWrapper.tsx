import { WrapperProps } from "@/types/common";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardWrapper({ children }: WrapperProps) {
  return (
    <div className="relative flex flex-row justify-end items-start mx-auto w-full h-full">
      <Sidebar />

      <div className="flex flex-col 3xl:max-w-[calc(100%-20rem)] max-w-[calc(100%-16rem)] w-full h-full">
        <Topbar />
        {children}
      </div>
    </div>
  );
}
