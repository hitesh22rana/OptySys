"use client";

import { IoMdNotifications } from "react-icons/io";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";

import TopbarDropDown from "@/components/dashboard/TopbarDropDown";
import Icon from "@/components/common/Icon";

import { useDashboardStore } from "@/stores";

export default function Topbar() {
  const { isSidebarOpen, toggleSidebar } = useDashboardStore();

  return (
    <header className="flex flex-row items-center justify-between bg-white w-full">
      <Icon onClick={toggleSidebar}>
        {isSidebarOpen ? (
          <RiMenuFoldLine className="cursor-pointer text-xl" />
        ) : (
          <RiMenuUnfoldLine className="cursor-pointer text-xl" />
        )}
      </Icon>

      <div className="relative flex flex-row items-center gap-8">
        <Icon>
          <div className="absolute bg-red-500 top-3 right-3 w-[5px] h-[5px] rounded-full" />
          <IoMdNotifications className="text-2xl" />
        </Icon>

        <TopbarDropDown />
      </div>
    </header>
  );
}
