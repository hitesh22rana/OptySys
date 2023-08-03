"use client";

import { RxHamburgerMenu } from "react-icons/rx";

import Icon from "@/src/components/common/Icon";
import Settings from "@/src/components/dashboard/lib/Settings";
import Notifications from "@/src/components/dashboard/lib/Notifications";

import { useDashboardStore } from "@/src/stores";

export default function Topbar() {
  const { toggleSidebar } = useDashboardStore();

  return (
    <header className="flex flex-row items-center justify-between w-full">
      <Icon onClick={toggleSidebar}>
        <RxHamburgerMenu className="md:hidden cursor-pointer text-xl" />
      </Icon>

      <div className="flex flex-row items-center gap-5">
        <Notifications />
        <Settings />
      </div>
    </header>
  );
}
