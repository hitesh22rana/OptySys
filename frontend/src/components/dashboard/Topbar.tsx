"use client";

import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";

import Icon from "@/src/components/common/Icon";
import Settings from "@/src/components/dashboard/lib/Settings";
import Notifications from "@/src/components/dashboard/lib/Notifications";

import { useDashboardStore } from "@/src/stores";

export default function Topbar() {
  const { isSidebarOpen, toggleSidebar } = useDashboardStore();

  return (
    <header className="flex flex-row items-center justify-between bg-white w-full py-2">
      <Icon onClick={toggleSidebar}>
        {isSidebarOpen ? (
          <RiMenuFoldLine className="cursor-pointer text-xl" />
        ) : (
          <RiMenuUnfoldLine className="cursor-pointer text-xl" />
        )}
      </Icon>

      <div className="flex flex-row items-center gap-8">
        <Notifications />

        <Settings />
      </div>
    </header>
  );
}