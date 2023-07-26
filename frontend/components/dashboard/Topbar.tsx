"use client";

import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";

import Icon from "@/components/common/Icon";
import Settings from "@/components/dashboard/lib/Settings";
import Notifications from "@/components/dashboard/lib/Notifications";

import { useDashboardStore } from "@/stores";

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
