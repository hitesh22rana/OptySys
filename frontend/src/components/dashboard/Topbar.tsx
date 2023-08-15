"use client";

import dynamic from "next/dynamic";
import { RxHamburgerMenu } from "react-icons/rx";

import Icon from "@/src/components/common/Icon";
import Settings from "@/src/components/dashboard/lib/Settings";
const Notifications = dynamic(
  () => import("@/src/components/dashboard/lib/Notifications")
);

import { useDashboardStore } from "@/src/stores";

export default function Topbar() {
  const { toggleSidebar } = useDashboardStore();

  return (
    <header className="flex w-full flex-row items-center justify-between">
      <Icon onClick={toggleSidebar}>
        <RxHamburgerMenu className="cursor-pointer text-xl md:hidden" />
      </Icon>

      <div className="flex flex-row items-center gap-5">
        <Notifications />
        <Settings />
      </div>
    </header>
  );
}
